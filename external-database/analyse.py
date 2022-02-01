from math import sqrt
from numpy import average
import pymysql.cursors
import pandas as pd
from datetime import datetime
from time import ctime

def transform_timestamp(stamp):
    try:
        if type(stamp) == list:
            return [datetime.fromordinal(int(x/(24*3600*1000))).strftime('%d-%m-%Y %H:%M:%S.%f') for x in stamp]
        return datetime.fromordinal(int(stamp/(24*3600*1000))).strftime('%d-%m-%Y %H:%M:%S.%f')
    except:
        return 1

def get_min(cursor, table):
    sql = "SELECT * FROM `{0}` WHERE `timestamp` = (SELECT MIN(`timestamp`) FROM `{0}`) LIMIT 1".format(table)
    cursor.execute(sql)
    result = cursor.fetchone()
    return transform_timestamp(result['timestamp'])
    # for res in result:
    #     # print(sqrt(res['timestamp']))
    #     print(transform_timestamp(res['timestamp']))

def get_max(cursor, table):
    sql = "SELECT * FROM `{0}` WHERE `timestamp` = (SELECT MAX(`timestamp`) FROM `{0}`) LIMIT 1".format(table)
    cursor.execute(sql)
    result = cursor.fetchone()
    return transform_timestamp(result['timestamp'])

def get_first_x(cursor, table, x):
    sql = "SELECT * FROM `{0}` LIMIT {1}".format(table, x)
    cursor.execute(sql)
    result = cursor.fetchall()
    result = [res['timestamp'] for res in result]
    return transform_timestamp(result)

def avg_timestep(cursor, table, sample):
    sql = "SELECT * FROM `{0}` LIMIT {1}".format(table, sample)
    cursor.execute(sql)
    result = cursor.fetchall()
    result = [res['timestamp'] for res in result]
    avgs = []
    for i in range(1,sample-1):
        avgs.append(result[i+1]-result[i])
    return datetime.fromtimestamp(((average(avgs)/100000))).strftime('%M:%S.%f')

def print_stats(cursor, table):
    print("### {0}".format(table.title()))
    print(" - Min: {0}".format(get_min(cursor, table)))
    print(" - Max: {0}".format(get_max(cursor, table)))
    print(" - First 5: ")
    for i in get_first_x(cursor, table, 5):
        print("\t - {0}".format(i))
    print(" - Average timestep (minutes:seconds.microseconds): \n\t - {0}".format(avg_timestep(cursor, table, 1000)))
    print()

# Connect to the database
connection = pymysql.connect(host='192.168.32.3',
                             user='root',
                             password='example',
                             database='humber_bridge',
                             cursorclass=pymysql.cursors.DictCursor)

with connection:
    with connection.cursor() as cursor:
        # Read a single record
        important_tables = ['displacements', 'gps', 'inclination', 'temperature', 'summary']
        extended_tables = ['extension_exb077ed','extension_exb077wd','extension_exh077ed','extension_exh077wd', 'meteo_hbb', 'meteo_noaa', 'meteo_scada', 'rot_acc']
        
        for i_tab in important_tables:
            print_stats(cursor, i_tab)
        for e_tab in extended_tables:
            print_stats(cursor, e_tab)

