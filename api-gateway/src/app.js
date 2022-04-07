var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');

var indexRouter = require('./routes/index');
var sensorsRouter = require('./routes/sensors');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var anomalyRouter = require('./routes/anomalies')
var commentRouter = require('./routes/comments')
var authRouter = require('./routes/auth')

var app = express();
var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

const checkJwt = auth({
    audience: 'shm',
    issuerBaseURL: `https://exetercivil.eu.auth0.com/`,
    tokenSigningAlg: 'RS256'
});
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/sensors',checkJwt, sensorsRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/anomalies', anomalyRouter);
app.use('/comments', commentRouter);

module.exports = app;
