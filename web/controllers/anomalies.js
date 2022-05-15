const express = require('express');

const router = express.Router();
const knex = require('../database/knex-internal');

router.get('/', (req, res) => {
  const { status } = req.query;
  const { limit } = req.query;
  const { offset } = req.query;
  const { from } = req.query;
  const { until } = req.query;
  const { sensor } = req.query;

  knex('anomalies')
    .select(
      'id',
      'sensor_time',
      'sensor_id',
      'status',
      'confidence',
      'sensitivity',
      'updated_at',
      'user_id'
    )
    .modify((builder) => {
      if (status) builder.where({ status });
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
      // if (from && until) builder.whereBetween('time', [from, until]);
      if (sensor) builder.where({ 'sensor_id': sensor });
    })
    .then((anomalies) => {
      if (!anomalies || !anomalies.length) {
        res.status(404).json('No anomalies found.');
      } else {
        res.json(anomalies);
      }
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  knex('anomalies')
    .select(
      'id',
      'sensor_time',
      'sensor_id',
      'status',
      'confidence',
      'sensitivity',
      'updated_at',
      'user_id'
    )
    .where({ 'id': id })
    .first()
    .then((anomaly) => {
      if (!anomaly) {
        res.status(404).json(`Anomaly with ID ${id} not found.`);
      } else {
        res.json(anomaly);
      }
    });
});

module.exports = router;
