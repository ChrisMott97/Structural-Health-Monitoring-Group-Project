const express = require('express');

const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use((req, res, next) => {
  // Make `user` and `authenticated` available in templates
  if (req.oidc.isAuthenticated()) {
    res.locals.user = req.oidc.user;
    res.locals.authenticated = true;
  } else {
    res.locals.user = null;
    res.locals.authenticated = false;
  }
  next();
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/authenticated', requiresAuth(), (req, res) => {
  res.render('authenticated');
});

router.get('/dash', requiresAuth(), (req, res) => {
  console.log(res.locals.user)
  res.render('dash');
});

router.get('/database', requiresAuth(), (req, res) => {
  res.render('database');
});

router.get('/anomalies', requiresAuth(), (req, res) => {
  res.render('anomalies');
});

router.get('/settings', requiresAuth(), (req, res) => {
  res.render('settings');
});

router.get('/reports', requiresAuth(), (req, res) => {
  res.render('reports');
});

router.get('/report', requiresAuth(), (req, res) => {
  res.render('report');
});

router.get('/sensor', requiresAuth(), (req, res) => {
  res.render('sensor');
});

module.exports = router;
