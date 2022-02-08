var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let sql = `SELECT * FROM sensors`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Sensor data successfully retrieved."
    })
  })
});

module.exports = router;
