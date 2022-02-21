var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Successful connection!")
});

module.exports = router;
