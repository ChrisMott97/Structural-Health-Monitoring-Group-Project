from sqlalchemy import DateTime, Float, create_engine, ForeignKey, MetaData, Table, Column, Integer, String
import pandas as pd
import datetime
import random
from sqlalchemy.dialects import mysql
from faker import Faker
fake = Faker()

def OrdinalToDatetime(ordinal):
    try:
        plaindate = datetime.date.fromordinal(int(ordinal))
    except:
        plaindate = datetime.date.fromordinal(1)
    date_time = datetime.datetime.combine(plaindate, datetime.datetime.min.time())
    return date_time + datetime.timedelta(days=ordinal-int(ordinal))

engine = create_engine('mysql+pymysql://root:example@localhost:33062/humber_bridge', echo=True, future=True)
# engine = create_engine('mysql+pymysql://root:example@localhost:33062/humber_bridge', echo=False, future=True)
# user : password @ host : port / database
metadata = MetaData()

sensors = Table(
    "sensors",
    metadata,
    Column("id", String(30), primary_key=True),
    Column("type", String(30), nullable=False),
    Column("subtype", String(30)),
    Column("location", String(30), nullable=False),
    Column("unit", String(30))
)

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("name", String(30), nullable=False),
    Column("permission", Integer, nullable=False),
    Column("password", String(30), nullable=False)
)

anomalies = Table(
    "anomalies",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("status", Integer, nullable=False),
    Column("confidence", Float, nullable=False),
    Column("modified_at", DateTime),
    Column("notes", String(30)),
    Column("user_id",ForeignKey('users.id'), nullable=False)
)

data = Table(
    "data",
    metadata,
    Column("time", DateTime, primary_key=True),
    Column("value", mysql.DOUBLE),
    Column("sensor_id", ForeignKey("sensors.id"), nullable=False, primary_key=True),
    Column("anomaly_id", ForeignKey("anomalies.id"))
)

related = Table(
    "related",
    metadata,
    Column("sensor_id", ForeignKey("sensors.id"), nullable=False),
    Column("related_id", ForeignKey("sensors.id"), nullable=False)
)
metadata.drop_all(engine) #not a drop-in replacement for migrations - see Alembic
metadata.create_all(engine)

# users_data = [
#     {"name": "Chris Mott", "permission": 1, "password": "password1"},
#     {"name": "Callum Evans", "permission": 1, "password": "password2"},
#     {"name": "Daniel Belfield", "permission": 1, "password": "password3"},
#     {"name": "Daniel Tighe", "permission": 1, "password": "password4"}
# ]
users_data = [{"id": i+1, "name": fake.name(), "permission": random.randint(1,5), "password": fake.password(10)} for i in range(4)]
sensors_data = [
    {"id": "GPH000EDE","type": "GPS", "subtype": "Longitude", "location": "East Antenna", "unit": "degrees"},
    {"id": "GPH000EDN","type": "GPS", "subtype": "Latitude", "location": "East Antenna", "unit": "degrees"},
    {"id": "GPH000EDH","type": "GPS", "subtype": "Height", "location": "East Antenna", "unit": "metre"},
    {"id": "GPH000WDE","type": "GPS", "subtype": "Longitude", "location": "West Antenna", "unit": "degrees"},
    {"id": "GPH000WDN","type": "GPS", "subtype": "Latitude", "location": "West Antenna", "unit": "degrees"},
    {"id": "GPH000WDH","type": "GPS", "subtype": "Height", "location": "West Antenna", "unit": "metre"}
]
related_data = []
measured_data = []
anomaly_data = []

# matches related sensors by location
for sensor in sensors_data:
    for related_sensor in sensors_data:
        if (sensor["location"] == related_sensor["location"]) and not (sensor["id"] == related_sensor["id"]):
            related_data.append({
                "sensor_id": sensor["id"], 
                "related_id": related_sensor["id"]
                })

data_import = pd.read_csv(
    "data.csv",
    index_col="timestamp",
    header=0
)
for i in range(len(data_import)-1):
    for s in data_import.columns:
        measured_data.append({
            "time": OrdinalToDatetime(data_import.iloc[i].name/((24*3600*1000))), 
            "value": data_import.iloc[i][s], 
            "sensor_id": s,
            "anomaly_id": None
            })

data_indices = random.sample(range(len(measured_data)), 10)
for ind, i in enumerate(data_indices):
    # id = random.uniform(1,100)*random.uniform(1,100)
    id = ind+1
    status = random.randint(1,5)
    confidence = random.uniform(1,100)/100
    modified_at = fake.date_this_month()
    notes = "This is a fake anomoly."
    user_id = random.choice(users_data)["id"]
    measured_data[i]["anomaly_id"] = id
    anomaly_data.append({
        "id": id,
        "status": status,
        "confidence": confidence,
        "modified_at": modified_at,
        "notes": notes,
        "user_id": user_id
    })

with engine.connect() as conn:
    users_res = conn.execute(users.insert(), users_data)
    sensors_res = conn.execute(sensors.insert(), sensors_data)
    related_res = conn.execute(related.insert(), related_data)
    anomaly_data_res = conn.execute(anomalies.insert(), anomaly_data)
    measured_data_res = conn.execute(data.insert(), measured_data)
    conn.commit()


# CREATE TABLE `sensors`
# (
#  `id`          varchar(45) NOT NULL ,
#  `type`        text NOT NULL ,
#  `location_id` int NOT NULL ,
#  `unit`        text NOT NULL ,

# PRIMARY KEY (`id`),
# KEY `FK_60` (`location_id`),
# CONSTRAINT `FK_58` FOREIGN KEY `FK_60` (`location_id`) REFERENCES `locations` (`id`)
# );