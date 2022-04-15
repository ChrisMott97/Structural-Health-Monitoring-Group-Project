var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  const limit = req.query.limit
  const type = req.query.type
  const subtype = req.query.subtype
  const location = req.query.location
  const offset = req.query.offset

  const enumerate = req.query.enumerate

  if(enumerate){
    knex('sensors')
    .distinct(enumerate)
    .then(enums => {
      if(!enums || !enums.length){
        res.status(404).json(`No sensor ${enumerate}s found.`)
      }else{
        res.json(enums.map(a => a[enumerate]))
      }
    })
  }else{
    knex('sensors')
    .select()
    .modify((builder)=>{
      if(limit){
        builder.limit(limit)
      }
      if(offset){
        builder.offset(offset)
      }
      if(type){
        builder.where({type: type})
      }
      if(subtype){
        builder.where({subtype: subtype})
      }
      if(location){
        builder.where({location: location})
      }
    })
    .then(sensors => {
      if(!sensors || !sensors.length){
        res.status(404).json(`No sensors found.`)
      }else{
        res.json(sensors)
      }
    })
  }

});

router.get('/:id', function(req, res) {
  const id = req.params.id
  if(!id){
    res.redirect('/sensors')
  }

  knex('sensors')
  .select()
  .where({id: id})
  .first()
  .then(sensor => {
    if(!sensor) {
      res.status(404).json(`Sensor ${id} is not found.`)
    }else{
      res.json(sensor)
    }
  })
});

router.get('/:id/related', function(req, res) {
  const id = req.params.id
  knex('related')
  .select("related_id")
  .where({sensor_id: id})
  .then(sensors => {
    if(!sensors || !sensors.length){
      res.status(404).json(`No related sensors found.`)
    }else{
      res.json(sensors.map(a => a.related_id))
    }
  })
})

module.exports = router;
