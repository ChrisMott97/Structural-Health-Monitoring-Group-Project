var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  let userID = req.query['user-id']
  let sensorID = req.query['sensor-id']
  let anomalyID = req.query['anomaly-id']

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
  let id = req.params.id
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
