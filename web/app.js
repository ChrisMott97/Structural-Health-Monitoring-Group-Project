const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const ejs = require('ejs');
const { auth, requiresAuth, claimIncludes } = require('express-openid-connect');
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const index = require('./controllers/index');
const admin = require('./controllers/admin');
const sensors = require('./controllers/sensors');
const users = require('./controllers/users');
const data = require('./controllers/data');
const anomalies = require('./controllers/anomalies');
const comments = require('./controllers/comments');
const reports = require('./controllers/reports');

const app = express();
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

const corsOptions = {
  origin: 'http://localhost:3030',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3030',
  clientID: '***REMOVED***',
  issuerBaseURL: 'https://***REMOVED***',
  secret: '***REMOVED***',
  routes: {
    login: false,
  },
  errorOnRequiredAuth: true,
};

// const checkJwt = auth({
//     audience: 'shm',
//     issuerBaseURL: `https://***REMOVED***/`,
//     tokenSigningAlg: 'RS256'
// });

// const checkScopes = requiredScopes('read:messages');

app.use(cors(corsOptions));
app.use(auth(config));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', claimIncludes('http://localhost:3030/roles', 'Admin'), admin);
app.get('/login', (req, res) => res.oidc.login({ returnTo: '/dash' }));

app.use('/api/sensors', sensors);
app.use(
  '/api/users',
  claimIncludes('http://localhost:3030/roles', 'Admin'),
  users
);
// app.use('/api/users',users);
app.use('/api/data', data);
app.use('/api/anomalies', requiresAuth(), anomalies);
app.use('/api/comments', requiresAuth(), comments);
app.use('/api/reports', reports);

app.use((req, res) => {
  res.status(404).render('custom_404');
});

module.exports = app;
