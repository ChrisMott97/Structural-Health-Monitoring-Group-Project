var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  const results = [];
  fs.createReadStream('/home/node/app/database/seeds/data.csv')
    .pipe(csv())
    .on('data', (data) => {
      console.log("any data?")
      results.push(data)
    })
    .on('end', () => {
      console.log("DONE!")
    })
  res.send("Successful connection!")
});

module.exports = router;
