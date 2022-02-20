var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  let status = req.query.status

  knex('anomalies')
  .join("data", function() {
    this.on('anomalies.sensor_id', '=', 'data.sensor_id').andOn('anomalies.sensor_time', '=', 'data.time')
  })
  .join("users", "anomalies.user_id", "=", "users.id")
  .select('anomalies.id', 'time', 'value', 'anomalies.sensor_id', 'status', 'confidence', 'updated_at', 'notes', 'name')
  .modify((builder) => {
    if(status){
      builder.where({status: status})
    }
  })
  .then(data => {
    if(!data || !data.length){
      res.status(404).json(`No anomalies found.`)
    }else{
      res.json(data)
    }
  })
});

router.get('/:id', function(req, res) {
  let id = req.params.id

  knex('anomalies')
  .join("data", function() {
    this.on('anomalies.sensor_id', '=', 'data.sensor_id').andOn('anomalies.sensor_time', '=', 'data.time')
  })
  .join("users", "anomalies.user_id", "=", "users.id")
  .select('anomalies.id', 'time', 'value', 'anomalies.sensor_id', 'status', 'confidence', 'updated_at', 'notes', 'name')
  .where({"anomalies.id": id})
  .first()
  .then(data => {
    if(!data){
      res.status(404).json(`Anomaly with ID ${id} not found.`)
    }else{
      res.json(data)
    }
  })
});

module.exports = router;
