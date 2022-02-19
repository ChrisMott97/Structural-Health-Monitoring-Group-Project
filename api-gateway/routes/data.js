var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  let sensor = req.query.sensor
  if(sensor){
    knex('data').select().where("sensor_id", sensor).then(data => {
      res.send(data)
    })
  }else{
    knex('data').select().then(data => {
      res.send(data)
    })
  }
});


module.exports = router;
