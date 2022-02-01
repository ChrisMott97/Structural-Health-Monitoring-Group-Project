from numpy import average
import pymysql.cursors
import pandas as pd
import datetime

def OrdinalToDatetime(ordinal):
    try:
        plaindate = datetime.date.fromordinal(int(ordinal))
    except:
        plaindate = datetime.date.fromordinal(1)
    date_time = datetime.datetime.combine(plaindate, datetime.datetime.min.time())
    return date_time + datetime.timedelta(days=ordinal-int(ordinal))

def transform_timestamp(stamp):
        try:
            return OrdinalToDatetime(stamp/(24*3600*1000)).strftime('%d-%m-%Y %H:%M:%S.%f')
        except:
            return stamp

def transform_time_only(stamp):
        try:
            return OrdinalToDatetime(stamp/(24*3600*1000)).strftime('%H:%M:%S.%f')
        except:
            return stamp

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
    return [transform_timestamp(i) for i in result]

def avg_timestep(cursor, table, sample):
    sql = "SELECT * FROM `{0}` LIMIT {1}".format(table, sample)
    cursor.execute(sql)
    result = cursor.fetchall()
    result = [res['timestamp'] for res in result]
    avgs = []
    for i in range(1,sample-1):
        avgs.append(result[i+1]-result[i])
    # print(average(avgs))
    return transform_time_only(average(avgs))

def output_stats(cursor, table):
    file = open("stats.md", "a") 
    file.write("### {0}\n".format(table.title()))
    file.write(" - Min: {0}\n".format(get_min(cursor, table)))
    file.write(" - Max: {0}\n".format(get_max(cursor, table)))
    file.write(" - First 5: \n")
    for i in get_first_x(cursor, table, 5):
        file.write("    - {0}\n".format(i))
    file.write(" - Average timestep (hours:minutes:seconds.microseconds): \n    - {0}\n\n".format(avg_timestep(cursor, table, 1000)))
    file.close() 

# Connect to the database '192.168.32.3'
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
        
        file = open("stats.md", "w") 
        file.write("")
        file.close()

        for i_tab in important_tables:
            output_stats(cursor, i_tab)
        for e_tab in extended_tables:
            output_stats(cursor, e_tab)

