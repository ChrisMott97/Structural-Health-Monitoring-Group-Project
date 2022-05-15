const express = require('express');

const router = express.Router();
const internal = require('../database/knex-internal');
const external = require('../database/knex-external');

getDate = function(intval) {
  var minDate;
  minDate = new Date();
  minDate.setUTCFullYear(0);
  minDate.setUTCMonth(0);
  minDate.setUTCDate(1);
  minDate.setUTCSeconds(0);
  minDate.setUTCMilliseconds(0);
  minDate.setDate(minDate.getDate() + intval);
  return minDate;
};


router.get('/', (req, res) => {
  const { sensor, from, until, limit, offset } = req.query;

  external('summary')
    .modify((builder) => {
      if (sensor) builder.select('timestamp', sensor);
      // if (sensor) builder.raw()
      // if (from && until) builder.whereBetween('time', [from, until]);
      if (from && until) builder.whereRaw('timestamp BETWEEN TO_DAYS(?)*(24*3600*1000) AND TO_DAYS(?)*(24*3600*1000)', [from, until])
      if (limit) builder.limit(limit);
      if (offset) builder.offset(offset);
    })
    .then((data) => {
      if (!data || !data.length) {
        res.status(404).json(`No data found.`);
      } else {
        // new_data = []
        // data.forEach(d => {
        //   d_n = d
        //   d_n.timestamp = getDate(d_n.timestamp/(24*3600*1000))
        //   new_data.push(d_n)
        // });
        res.json(data);
      }
    });
});

module.exports = router;
