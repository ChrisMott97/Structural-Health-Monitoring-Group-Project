import numpy as np
import pandas as pd
import torch
from torch import nn
import pymysql
import psycopg2
from os import environ

def main(anomaly_sensitivity=[1,2,3,4,5]):
    '''
    Carry out the anomaly detection based on the input sensitivies.
    Note: For more detailed comments and for training a model on new data please see the Jupyter notebook file.
    Parameters:
    anomaly_sensitivity: List of values to determine how sensitive the anomaly detection is, where the smaller the number is the
    higher the sensitivity.
    '''
    dbcon = pymysql.connect(user="root", password="example", database="humber_bridge", host=environ.get("DATABASE", "external-database"))
    data = pd.read_sql("SELECT * FROM summary order by timestamp desc limit 2000", dbcon)
    data.replace([1.1e+308], np.nan, inplace=True) # Replace infinite values with nan
    data.fillna(np.nan, inplace=True) # Replace empty cells with nan
    data.dropna(axis=1,how='all',inplace=True) # Remove empty columns (sensors with no data for all timesteps)
    data_df = data.replace([np.nan], 0) # Replace all nan values with 0
    training_data = data_df.select_dtypes(include=np.number)
    training_data = (training_data - training_data.mean())/training_data.std()

    size = training_data.shape[1]
    # Using a GPU which supports CUDA will make training the model faster
    device = torch.device('cpu')#'cuda:0' if torch.cuda.is_available() else 'cpu')

    class AutoEncoder(torch.nn.Module):
        def __init__(self):
            super(AutoEncoder, self).__init__()
            self.encoder = nn.Sequential(
                nn.Linear(size, size//2),
                nn.ReLU(True),
                nn.Linear(size//2, size//4),
                nn.ReLU(True),
                nn.Linear(size//4, 4)
            ).to(device)
            self.decoder = nn.Sequential(
                nn.Linear(4, size//4),
                nn.ReLU(True),
                nn.Linear(size//4, size//2),
                nn.ReLU(True),
                nn.Linear(size//2, size)
            ).to(device)
        
        def forward(self, x):
            encoded = self.encoder(x)
            decoded = self.decoder(encoded)
            return decoded

    # Change to change the ratio of training data to testing data
    split_percentage = 0.15
    train_test_split = int(np.round(split_percentage*len(data_df)))

    # Load the training/testing data into tensors for the model
    testing_tensor_data = torch.from_numpy(training_data[train_test_split:].values.astype(np.float32)).to(device)

    # Create the model
    model = AutoEncoder().to(device)
    model.load_state_dict(torch.load('/app/autoencoder/ae_model'))
    loss_func = nn.MSELoss().to(device)

    model.eval()
    loss_list = []
    for i in range(len(testing_tensor_data)):
        data = testing_tensor_data[i]
        sample = model(data.to(device))
        loss = loss_func(data.to(device), sample)
        loss_list.append(loss.item())

    # Create the test data in reference to the original dataframe
    test_data = data_df[train_test_split:]
    indices = []
    sensitivities = []

    for sensitivity in anomaly_sensitivity:
        ind = np.array(np.argwhere(np.array(loss_list)>np.mean(loss_list)+(sensitivity*np.std(loss_list))).reshape(-1))
        indices.append(ind)
        sensitivities.append(np.full(len(ind), sensitivity))
    sensitivities = np.concatenate(sensitivities)

    confidence = []
    for i in range(len(anomaly_sensitivity)):
        confidence.append(np.array(loss_list)[indices[i]])
    confidence = np.concatenate(confidence)

    timestamps = []
    for i in range(len(anomaly_sensitivity)):
        timestamps.append(np.array(test_data.iloc[indices[i]][test_data.iloc[indices[i]].columns[0]].values))
    timestamps = np.concatenate(timestamps)

    col_names = ['timestamps', 'sensitivity', 'confidence']
    sql_df = pd.DataFrame([timestamps, sensitivities, confidence]).transpose()
    sql_df.columns = col_names
    records = sql_df.to_records(index=False)
    result = list(records)
    dbcon2 = psycopg2.connect(user="root", password="example", database="humber_bridge", host="internal-database")
    cur = dbcon2.cursor()
    sql = "INSERT INTO anomalies (sensor_time, sensitivity, confidence) VALUES(%s, %s, %s)"
    for row in result:
        cur.execute(sql, row)
    dbcon2.commit()
    cur.close()

if __name__ == "__main__":
    main()