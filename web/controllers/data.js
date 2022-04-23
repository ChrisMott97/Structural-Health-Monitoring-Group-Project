const express = require('express');

const router = express.Router();
const knex = require('../database/knex-internal');

router.get('/', (req, res) => {
  const { sensor, from, until, limit, offset } = req.query;

  knex('data')
    .select()
    .modify((builder) => {
      if (sensor) builder.where({ sensor_id: sensor });
      if (from && until) builder.whereBetween('time', [from, until]);
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
    })
    .then((data) => {
      if (!data || !data.length) {
        res.status(404).json(`No data found.`);
      } else {
        res.json(data);
      }
    });
});

module.exports = router;
