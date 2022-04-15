var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
const { requiresAuth, claimEquals, claimIncludes  } = require('express-openid-connect');

router.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  if(req.oidc.isAuthenticated()){
    console.log(req.oidc.user)
    res.locals.user = req.oidc.user
    res.locals.authenticated = true
  }else{
    res.locals.user = null
    res.locals.authenticated = false
  }
  next()
})

router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/adduser', claimIncludes('http://localhost:3030/roles','Admin'), function(req, res, next) {
  res.render('adduser')
});

router.get('/authenticated', requiresAuth(), function(req, res, next) {
  res.render('authenticated')
});

router.get('/dash', requiresAuth(), function(req, res, next) {
  res.render('dash')
});

router.get('/database', requiresAuth(), function(req, res, next) {
  res.render('database')
});

router.get('/notifications', requiresAuth(), function(req, res, next) {
  res.render('notifications')
});

router.get('/report', requiresAuth(), function(req, res, next) {
  res.render('report')
});

router.get('/sensor', requiresAuth(), function(req, res, next) {
  res.render('sensor')
});

module.exports = router;
