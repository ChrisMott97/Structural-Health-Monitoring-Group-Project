from flask import Flask
from timeseries.ts_nn import main as predict_ts
from autoencoder.auto_encoder import main as predict_ae
import psycopg2
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Python server is running.'

@app.route('/predict')
def predict_route():
    dbcon2 = psycopg2.connect(user="root", password="example", database="humber_bridge", host="internal-database")
    cur = dbcon2.cursor()
    sql = "TRUNCATE TABLE anomalies, comments RESTART IDENTITY"
    cur.execute(sql)
    dbcon2.commit()
    cur.close()
    
    predict_ae()
    predict_ts()
    return "Predicted"
