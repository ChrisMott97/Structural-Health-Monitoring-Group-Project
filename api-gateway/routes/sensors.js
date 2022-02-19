var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  knex('sensors').select().then(sensors => {
    res.send(sensors)
  })
});

router.get('/:id', function(req, res) {
  let id = req.params.id
  knex('sensors').select().where({id: id}).first().then(sensor => {
    if(sensor == null){
      res.status(404).json(`Sensor ${id} is not found.`)
    }
    res.send(sensor)
  })
});

module.exports = router;
