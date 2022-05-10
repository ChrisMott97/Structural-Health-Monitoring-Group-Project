import pymysql
import pandas as pd
import matplotlib.pyplot as plt

# returns the middle time, mean, and standard deviation for each increment of timeframe between start_time and end_time for a given sensor
def stat_time(sensor, start_time, end_time, timeframe = 'd'):
    # loads the data
    dbcon = pymysql.connect(user="root", password="example", database="humber_bridge", host="localhost", port=33061)
    data = pd.read_sql("select * from summary", dbcon)
    data.fillna(value = 0, inplace = True)
    data.replace(1.1e308, 0, inplace = True)

    # finds the average timestamp increase for the chosen sensor
    fin_data = data.loc[data[sensor] != 0]
    time_diff = []
    for i in range(len(fin_data["timestamp"])-1):
        time_diff.append(data["timestamp"].iloc[i+1] - data["timestamp"].iloc[i])
    time_diff = max(set(time_diff), key=time_diff.count)

    # collects all the valid data where information should be being recorded
    x = fin_data["timestamp"].iloc[0]
    y = fin_data["timestamp"].iloc[-1]
    timestamps = []
    while x <= y:
        timestamps.append(x)
        x += time_diff
    fin_data = data.loc[data["timestamp"].isin(timestamps)]

    # calculates the two timestamps to search between and the periodicity
    time_hour = 3600000
    if timeframe == "h":
        z=time_hour
    elif timeframe == "y":
        # Year simplified to 365 days
        z=365*time_hour
    elif timeframe == "w":
        z=24*7*time_hour
    elif timeframe == "m":
        # Month simplified to 30 days
        z=24*30*time_hour
    else:
        # Defaults to 1 day
        z=24*time_hour


    # calculates the mean and standard deviation between the two timestamps (y and x)
    out = []
    x = end_time
    y = x-z
    mean_out = []
    std_out = []
    mid_out = []
    while y >= start_time:
        mean = fin_data[sensor].loc[(fin_data["timestamp"] <= x) & (fin_data["timestamp"] >= y)].mean()
        std = fin_data[sensor].loc[(fin_data["timestamp"] <= x) & (fin_data["timestamp"] >= y)].std()
        mid = y-((y-x)/2)
        out.append((mid, mean, std))
        mean_out.append(mean)
        std_out.append(std)
        mid_out.append(mid)
        x = y
        y = x-z
    # (0.0, 0.0) is when the sensor is offline but timestamps exist
    # (nan, nan) is when no timestamps exist for the sensor in the alloted time
    return out, mid_out, mean_out, std_out

# returns an errorbar plot for the given data output in stat_time where the x value is the middle time, the y value is the mean, and the error is the standard deviation
def stat_show(out):
    x = []
    y = []
    err = []
    for i in out:
        x.append(i[0])
        y.append(i[1])
        err.append(i[2])
    graph = plt.errorbar(x, y, yerr=err)
    return graph