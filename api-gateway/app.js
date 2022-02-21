var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var sensorsRouter = require('./routes/sensors');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var anomalyRouter = require('./routes/anomalies')
var commentRouter = require('./routes/comments')

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
app.use('/comments', commentRouter);

module.exports = app;
