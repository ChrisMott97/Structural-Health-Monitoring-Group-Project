var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var ejs = require('ejs')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

var index = require('./controllers/index');
var sensors = require('./controllers/sensors');
var users = require('./controllers/users');
var data = require('./controllers/data');
var anomalies = require('./controllers/anomalies')
var comments = require('./controllers/comments')

var app = express();
app.set('view engine', 'html')
app.engine('html', ejs.renderFile);
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

const checkScopes = requiredScopes('read:messages');


app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/sensors',checkJwt, sensors);
app.use('/api/users',checkJwt, users);
app.use('/api/data',checkJwt, data);
app.use('/api/anomalies',checkJwt, anomalies);
app.use('/api/comments',checkJwt, comments);

module.exports = app;
