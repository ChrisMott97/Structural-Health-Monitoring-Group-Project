const express = require('express');

const router = express.Router();
const internal = require('../database/knex-internal');
const external = require('../database/knex-external');


router.get('/', (req, res) => {
  const { sensor, from, until, limit, offset } = req.query;

  external('summary')
    .modify((builder) => {
      if (sensor) builder.select('timestamp', sensor);
      // if (from && until) builder.whereBetween('time', [from, until]);
      if (from && until) builder.whereRaw('timestamp BETWEEN TO_DAYS(?)*(24*3600*1000) AND TO_DAYS(?)*(24*3600*1000)', [from, until])
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
