var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  knex('anomalies')
  .join("data", function() {
    this.on('anomalies.sensor_id', '=', 'data.sensor_id').andOn('anomalies.sensor_time', '=', 'data.time')
  })
  .join("users", "anomalies.user_id", "=", "users.id")
  .select('anomalies.id', 'time', 'value', 'anomalies.sensor_id', 'status', 'confidence', 'updated_at', 'notes', 'name')
  .then(data => {
    res.json(data)
  })
  // let sql = `
  // SELECT anomaly_id, time, value, sensor_id, status, confidence, modified_at, notes, name 
  // FROM data 
  // INNER JOIN anomalies ON data.anomaly_id=anomalies.id 
  // INNER JOIN users ON anomalies.user_id=users.id
  // `;
  // db.query(sql, function(err, data, fields) {
  //   if (err) throw err;
  //   res.json({
  //     status: 200,
  //     data,
  //     message: "Anomalies successfully retrieved!!"
  //   })
  // })
});

module.exports = router;
