from ast import Or
from math import sqrt
from numpy import average, int0
import pymysql.cursors
import pandas as pd
import datetime
from time import ctime

lst = [63473328000000, 63473328000050, 63473328000100, 63473328000150, 63473328000200]

def OrdinalToDatetime(ordinal):
    plaindate = datetime.date.fromordinal(int(ordinal))
    date_time = datetime.datetime.combine(plaindate, datetime.datetime.min.time())
    return date_time + datetime.timedelta(days=ordinal-int(ordinal))

for i in lst:
    print(OrdinalToDatetime(i/(24*3600*1000)))
