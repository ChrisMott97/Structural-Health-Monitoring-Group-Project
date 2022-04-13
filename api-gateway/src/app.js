var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

var indexRouter = require('./routes/index');
var sensorsRouter = require('./routes/sensors');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var anomalyRouter = require('./routes/anomalies')
var commentRouter = require('./routes/comments')

var app = express();
var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

const checkJwt = auth({
    audience: 'shm',
    issuerBaseURL: `https://***REMOVED***/`,
    tokenSigningAlg: 'RS256'
});

const checkScopes = requiredScopes('read:messages');


app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sensors',checkJwt, sensorsRouter);
app.use('/users',checkJwt, usersRouter);
app.use('/data',checkJwt, dataRouter);
app.use('/anomalies',checkJwt, anomalyRouter);
app.use('/comments',checkJwt, commentRouter);

module.exports = app;
