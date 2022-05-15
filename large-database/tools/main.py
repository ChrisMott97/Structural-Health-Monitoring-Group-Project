import sqlalchemy as db
from sqlalchemy.orm import sessionmaker

engine = db.create_engine('mysql+pymysql://root:example@localhost:33061/humber_bridge')
connection = engine.connect()
metadata = db.MetaData()
inspector = db.inspect(engine)
metadata.reflect(bind=engine)

summary = db.Table('summary', metadata, autoload=True, autoload_with=engine)
# query = db.select([summary]).limit(1)
# result_proxy = connection.execute(query)
# result_set = result_proxy.fetchone()

def get_columns(table):
    return inspector.get_columns(table)

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()

print(session.query(metadata.tables['summary']).first().timestamp)
    
# print(metadata.tables['summary'].first())