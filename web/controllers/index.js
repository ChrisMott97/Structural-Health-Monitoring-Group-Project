var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')

router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/adduser', function(req, res, next) {
  res.render('adduser')
});

router.get('/authenticated', function(req, res, next) {
  res.render('authenticated')
});

router.get('/dash', function(req, res, next) {
  res.render('dash')
});

router.get('/database', function(req, res, next) {
  res.render('database')
});

router.get('/notifications', function(req, res, next) {
  res.render('notifications')
});

router.get('/sensor', function(req, res, next) {
  res.render('sensor')
});

module.exports = router;
