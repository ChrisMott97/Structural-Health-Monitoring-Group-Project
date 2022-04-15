var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  const sensor = req.query.sensor
  const from = req.query.from
  const until = req.query.until
  const limit = req.query.limit
  const offset = req.query.offset

  knex('data')
  .select()
  .modify((builder) => {
    if(sensor) {
      builder.where({sensor_id: sensor})
    }
    if(from && until) {
      builder.whereBetween("time", [from, until])
    }
    if(limit) {
      builder.limit(limit)
    }
    if(offset) {
      builder.offset(offset)
    }
  })
  .then(data => {
    if(!data || !data.length){
      res.status(404).json(`No data found.`)
    }else{
      res.json(data)
    }
  })

});


module.exports = router;
