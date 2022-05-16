const express = require('express');

const router = express.Router();
const Comment = require('../models/Comment');
const knex = require('../database/knex-internal');

router.get('/', (req, res) => {
  const userID = req.query['user-id'];
  const sensorID = req.query['sensor-id'];
  const anomalyID = req.query['anomaly-id'];
  const { limit } = req.query;
  const { offset } = req.query;

  knex('comments')
    .select()
    .modify((builder) => {
      if (userID) builder.where({ user_id: userID });
      if (sensorID) builder.where({ sensor_id: sensorID });
      if (anomalyID) builder.where({ anomaly_id: anomalyID });
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
    })
    .then((comments) => {
      if (!comments || !comments.length) {
        res.status(404).json(`No comments found.`);
      } else {
        res.json(comments);
      }
    });
});

router.post('/', (req, res) => {
  const { sensor_id, anomaly_id, body, user_id } = req.body;
  Comment.create(sensor_id, anomaly_id, body, user_id).then((comment) => {
    res.json(comment);
  }).catch((err)=>{
    res.status(404).json(err)
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  knex('comments')
    .select()
    .where({ id })
    .first()
    .then((comment) => {
      if (!comment) {
        res.status(404).json(`Comment ${id} is not found.`);
      } else {
        res.json(comment);
      }
    });
});

module.exports = router;
