var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  const userID = req.query['user-id']
  const sensorID = req.query['sensor-id']
  const anomalyID = req.query['anomaly-id']
  const limit = req.query.limit
	const offset = req.query.offset

  knex('comments')
  .select()
  .modify((builder) => {
    if(userID) {
      builder.where({user_id: userID})
    }
    if(sensorID) {
      builder.where({sensor_id: sensorID})
    }
    if(anomalyID) {
      builder.where({anomaly_id: anomalyID})
    }
    if(limit) {
      builder.limit(limit)
    }
    if(offset) {
      builder.offset(offset)
    }
  })
  .then(comments => {
    if(!comments || !comments.length) {
      res.status(404).json(`No comments found.`)
    }else{
      res.json(comments)
    }
  })
});

router.get('/:id', function(req, res) {
  const id = req.params.id
  knex('comments')
  .select()
  .where({id: id})
  .first()
  .then(comment => {
    if(!comment){
      res.status(404).json(`Comment ${id} is not found.`)
    }else{
      res.json(comment)
    }
  })
});

module.exports = router;
