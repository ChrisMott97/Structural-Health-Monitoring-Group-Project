var express = require("express");
var router = express.Router();
const Sensor = require("../models/Sensor");
const Util = require("../models/Util");

router.get("/", function (req, res) {
  const { limit, type, subtype, location, offset, enumerate } = req.query;

  if (enumerate) {
    Util.enumerate("sensors", enumerate).then((enums) => {
      if (!enums || !enums.length) {
        res.status(404).json(`No sensor ${enumerate}s found.`);
      } else {
        res.json(enums.map((a) => a[enumerate]));
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

router.get("/:id", function (req, res) {
  const id = req.params.id;

  Sensor.findOne(id).then((sensor) => {
    if (!sensor) {
      res.status(404).json(`Sensor ${id} is not found.`);
    } else {
      res.json(sensor);
    }
  });
});

router.get("/:id/related", function (req, res) {
  const id = req.params.id;

  Sensor.findRelated(id).then((sensors) => {
    if (!sensors || !sensors.length) {
      res.status(404).json(`No related sensors found.`);
    } else {
      res.json(sensors.map((a) => a.related_id));
    }
  });
});

module.exports = router;
