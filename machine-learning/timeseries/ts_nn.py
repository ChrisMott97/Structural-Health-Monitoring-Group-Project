import copy
from os import kill, environ
from pathlib import Path
import warnings
import pickle
import numpy as np
import pandas as pd
import pytorch_lightning as pl
from pytorch_lightning.callbacks import EarlyStopping, LearningRateMonitor
from pytorch_lightning.loggers import TensorBoardLogger
import torch
import matplotlib.pyplot as plt
from pytorch_forecasting import Baseline, TemporalFusionTransformer, TimeSeriesDataSet
from pytorch_forecasting.data import GroupNormalizer
from pytorch_forecasting.metrics import SMAPE, PoissonLoss, QuantileLoss
from pytorch_forecasting.models.temporal_fusion_transformer.tuning import optimize_hyperparameters
import pymysql
import psycopg2

def ts_nn(sensitivity = [2,3,4,5,6]):
    # Loads the data from the external database
    dbcon = pymysql.connect(user="root", password="example", database="humber_bridge", host=environ.get("DATABASE", "external-database"))
    data = pd.read_sql("select * from summary order by timestamp desc limit 2000", dbcon) # Can remove/increase limit if enough GPU memory for CUDA, will increase accuracy
    data.fillna(value = 0, inplace = True) # Replaces NoneType values with 0
    data.replace(1.1e308, 0, inplace = True) # Replaces infinite values with 0
    data = data[::-1]
    data.reset_index(inplace=True, drop=True)

    # Normalizes the data for use in the encoder
    ts_data = pd.DataFrame()
    cols = data.columns[1:]
    sensor = []
    timestamp = []
    value = []
    time_idx = []
    ti = 0
    for i in range(len(data["timestamp"])):
        for j in cols:
            timestamp.append(data["timestamp"][i])
            value.append(data[j][i])
            sensor.append(j)
            time_idx.append(ti)
        ti += 1
    ts_data["timestamp"] = timestamp
    ts_data["sensor"] = sensor
    ts_data["value"] = value
    ts_data["time_idx"] = time_idx
    id = []
    for i in range(len(ts_data)):
        id.append(i)
    ts_data["id"] = id
    # ts_data has 4 columns, timestamp, sensor, value, and time_idx
    # There is a value for each sensor for each timestamp

    # The below optionally removes all sensors which are inactive. This is reccomended to stop overfitting to inactive sensors which causes the predictions to ignore active ones
    # If this is commented out, most predictions will lie at 0 as most sensors have an average value of 0 due to being inactive. Only comment this out if the majority of sensors are active
    tmp = ts_data[ts_data["value"] != 0]
    active_sensors = set(tmp["sensor"])
    ts_data = ts_data[ts_data["sensor"].isin(active_sensors)]

    # This is the only time series function that needs to be ran if you don't want to update the training
    # Creates the data set to run the prediction on using all the most recent data from the external database
    # Sets up the initial parameters
    max_prediction_length = int(len(ts_data)*0.4) # 60% training, 40% testing. Feel free to change this ratio if results are not as expected
    max_encoder_length = 16
    training_cutoff = ts_data["id"].max() - max_prediction_length
    validation = TimeSeriesDataSet(
        ts_data, # No lambda function to select all data
        time_idx="time_idx",
        target="value",
        group_ids=["sensor"], # Required to identify rows uniquely
        min_encoder_length=max_encoder_length//2, 
        max_encoder_length=max_encoder_length,
        min_prediction_length=1,
        max_prediction_length=max_prediction_length,
        predict_mode=True,
        add_relative_time_idx=True,
        static_categoricals=["sensor"],
        time_varying_known_reals=["time_idx"],
        time_varying_unknown_reals=["value"],
        allow_missing_timesteps=False # Set to False as time_idx increases steadily, if this function is edited and time_idx no longer increases steadily must be set to True
    )
    # Creates all neccesary functions with the new dataset and best prediction model
    batch_size = 8  # higher values increase accuracy at cost of CUDA memory
    val_dataloader = validation.to_dataloader(train=False, batch_size=batch_size * 10, num_workers=0)
    torch.cuda.empty_cache()

    # Opens the saved prediction model
    try:
        with open("/app/timeseries/ts_model.pkl", "rb") as fout:
            best_tft = pickle.load(fout)
    except:
        print("No model found")
        kill

    # Gathers predictions and actual values in a format that can be used for anomaly detection
    raw_predictions = best_tft.predict(val_dataloader, mode="prediction")
    all_preds = []
    for i in raw_predictions:
        preds = i.tolist()
        all_preds.append(preds)
    all_vals = []
    active_sensors = list(active_sensors)
    for j in active_sensors:
        vals = ts_data.loc[ts_data["sensor"] == j]
        tmp = []
        for i in vals["value"]:
            tmp.append(i)
        all_vals.append(tmp)

    # As the order of predictions doesn't match the order of sensors, runs a quick calculation to match the prediction to its closest value mapping
    pred_val_index = []
    for i in all_preds:
        min_diff = np.inf
        index = None
        for j in all_vals:
            if abs(sum(i) - sum(j)) < min_diff:
                if all_vals.index(j) not in pred_val_index:
                    min_diff = abs(sum(i) - sum(j))
                    index = all_vals.index(j)
        pred_val_index.append(index)
    all_vals[:] = [all_vals[i] for i in pred_val_index]
    active_sensors[:] = [active_sensors[i] for i in pred_val_index]
    sns_ano = []
    for user_threshold in sensitivity:
        # Anomaly detection function
        # Creates a list of anomalies, where for each of the last 2000 timestamps, if an anomaly has been detected, output 1, else output 0
        # Each list of 1/0 anomaly detection is appended to anomaly_list with its related sensor
        anomaly_list = []
        # For each sensor
        for j in range(len(all_preds)):
            anomaly_sensor = []
            # For each value
            for i in range(len(all_preds[j])):
                # If it is above the maximum threshold mark as an anomaly
                if all_preds[j][i]*(np.mean(all_preds[j])+np.std(all_preds[j])*user_threshold) < all_vals[j][i]:
                    anomaly_sensor.append(1)
                # If it is below the minimum threshold mark as an anomaly
                elif all_preds[j][i]*(np.mean(all_preds[j])-np.std(all_preds[j])*user_threshold) > all_vals[j][i]:
                    anomaly_sensor.append(1)
                # Else mark as not an anomaly
                else:
                    anomaly_sensor.append(0)
            anomaly_list.append([anomaly_sensor, active_sensors[j]])
        sns_ano.append([anomaly_list, user_threshold])
    
    return all_preds, all_vals, sns_ano, active_sensors, list(ts_data["timestamp"].unique())

def data_frame(all_preds, all_vals, anomaly_list, active_sensors, timestamps):
    # Sets required outputs up as dataframe to be imported into database
    df = pd.DataFrame()
    sensor = []
    timestamp = []
    value = []
    pred = []
    anomaly = []
    for i in range(len(all_preds[0])):
        for j in active_sensors:
            timestamp.append(timestamps[i])
            value.append(all_vals[active_sensors.index(j)][i])
            pred.append(all_preds[active_sensors.index(j)][i])
            anomaly.append(anomaly_list[active_sensors.index(j)][0][i])
            sensor.append(anomaly_list[active_sensors.index(j)][1])
    df["sensor_id"] = sensor
    df["sensor_time"] = timestamp
    df["value"] = value
    df["pred"] = pred
    df["anomaly"] = anomaly
    # dtb_df is the data pushed to the internal database
    dtb_df = df[df["anomaly"]==1]
    dtb_df = dtb_df[['sensor_time','sensor_id']]
    return df, dtb_df

def push_internal(dtb_df):
    # This adds data to the internal database
    dbcon = psycopg2.connect(user="root", password="example", database="humber_bridge", host="internal-database")
    cur = dbcon.cursor()
    # Create a list of tupples from the dataframe values
    tuples = [tuple(x) for x in dtb_df.to_numpy()]
    # Comma-separated dataframe columns
    cols = ','.join(list(dtb_df.columns))
    # SQL quert to execute
    query  = "INSERT INTO %s(%s) VALUES(%%s,%%s,%%s)" % ("anomalies", cols)
    cur.executemany(query, tuples)
    dbcon.commit()
    cur.close()

def main():
    all_preds, all_vals, sns_ano, active_sensors, ts_data = ts_nn()
    for anomaly_list in sns_ano:
        df, dtb_df = data_frame(all_preds, all_vals, anomaly_list[0], active_sensors, ts_data)
        dtb_df["sensitivity"] = anomaly_list[1]
        push_internal(dtb_df)

if __name__ == "__main__":
    main()