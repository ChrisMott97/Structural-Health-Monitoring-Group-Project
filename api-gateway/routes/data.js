var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  let sensor = req.query.sensor
  let from = req.query.from
  let until = req.query.until
  let limit = req.query.limit

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
