var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const knexConfig = require('./database/knexfile');
// db = mysql.createConnection({
//     host: 'internal-database',
//     user: 'root',
//     password: 'example',
//     database: 'humber_bridge'
//   })
const db = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'internal-database',
    port : 3306,
    user : 'root',
    password : 'example',
    database : 'humber_bridge'
  },pool: {
    min: 2,
    max: 6,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false // <- default is true, set to false
  },
  });

var indexRouter = require('./routes/index');
var sensorsRouter = require('./routes/sensors');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var anomalyRouter = require('./routes/anomalies')

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sensors', sensorsRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/anomalies', anomalyRouter);

module.exports = app;
