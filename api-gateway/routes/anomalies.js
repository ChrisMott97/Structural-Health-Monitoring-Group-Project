var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let sql = `
  SELECT anomaly_id, time, value, sensor_id, status, confidence, modified_at, notes, name 
  FROM data 
  INNER JOIN anomalies ON data.anomaly_id=anomalies.id 
  INNER JOIN users ON anomalies.user_id=users.id
  `;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Anomalies successfully retrieved!!"
    })
  })
});

module.exports = router;
