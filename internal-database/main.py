from sqlalchemy import DateTime, Float, create_engine, ForeignKey, MetaData, Table, Column, Integer, String, insert
engine = create_engine('mysql+pymysql://root:example@localhost:33062/humber_bridge', echo=True, future=True)

metadata = MetaData()

sensors = Table(
    "sensors",
    metadata,
    Column("id", String(30), primary_key=True),
    Column("type", String(30), nullable=False),
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
    Column("confidence", Integer, nullable=False),
    Column("modified_at", DateTime),
    Column("notes", String(30)),
    Column("user_id",ForeignKey('users.id'), nullable=False)
)

data = Table(
    "data",
    metadata,
    Column("time", DateTime, primary_key=True),
    Column("value", Float),
    Column("sensor_id", ForeignKey("sensors.id"), nullable=False),
    Column("anomaly_id", ForeignKey("anomalies.id"), nullable=False)
)

related = Table(
    "related",
    metadata,
    Column("sensor_id", ForeignKey("sensors.id"), nullable=False),
    Column("related_id", ForeignKey("sensors.id"), nullable=False)
)
metadata.drop_all(engine) #not a drop-in replacement for migrations - see Alembic
metadata.create_all(engine)

fake_users = [
    {"id": 1, "name": "Chris Mott", "permission": 1, "password": "password1"},
    {"id": 2, "name": "Callum Evans", "permission": 1, "password": "password2"},
    {"id": 3, "name": "Daniel Belfield", "permission": 1, "password": "password3"},
    {"id": 4, "name": "Daniel Tighe", "permission": 1, "password": "password4"}
]

ins = users.insert()
with engine.connect() as conn:
    res = conn.execute(ins, fake_users)
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