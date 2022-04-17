const express = require('express');

const router = express.Router();
const Sensor = require('../models/Sensor');
const Util = require('../models/Util');

router.get('/', (req, res) => {
  const { limit, type, subtype, location, offset } = req.query;
  const property = req.query.enumerate;

  if (property) {
    Util.enumerate('sensors', property).then((items) => {
      if (!items || !items.length) {
        res.status(404).json(`No sensor ${property}s found.`);
      } else {
        res.json(items.map((item) => item[property]));
      }
    });
  } else {
    Sensor.find(limit, offset, type, subtype, location).then((sensors) => {
      if (!sensors || !sensors.length) {
        res.status(404).json(`No sensors found.`);
      } else {
        res.json(sensors);
      }
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Sensor.findOne(id).then((sensor) => {
    if (!sensor) {
      res.status(404).json(`Sensor ${id} is not found.`);
    } else {
      res.json(sensor);
    }
  });
});

router.get('/:id/related', (req, res) => {
  const { id } = req.params;
  const { by } = req.query;

  Sensor.findSimilar(id, by).then((sensors) => {
    if (!sensors || !sensors.length) {
      res.status(404).json('No related sensors found.');
    } else {
      res.json(sensors.map((sensor) => sensor.id));
    }
  });
});

module.exports = router;
