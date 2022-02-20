var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  knex('sensors').select().then(sensors => {
    if(!sensors || !sensors.length){
      res.status(404).json(`No sensors found.`)
    }else{
      res.json(sensors)
    }
  })
});

router.get('/:id', function(req, res) {
  let id = req.params.id
  knex('sensors').select().where({id: id}).first().then(sensor => {
    if(!sensor){
      res.status(404).json(`Sensor ${id} is not found.`)
    }else{
      res.json(sensor)
    }
  })
});

module.exports = router;
