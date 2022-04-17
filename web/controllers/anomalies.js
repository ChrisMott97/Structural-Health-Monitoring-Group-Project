var express = require("express");
var router = express.Router();
const knexConfig = require("../database/knexfile.js")["development"];
const knex = require("knex")(knexConfig);

router.get("/", function (req, res) {
  const status = req.query.status;
  const limit = req.query.limit;
  const offset = req.query.offset;
  const from = req.query.from;
  const until = req.query.until;
  const sensor = req.query.sensor;

  knex("anomalies")
    .join("data", function () {
      this.on("anomalies.sensor_id", "=", "data.sensor_id").andOn(
        "anomalies.sensor_time",
        "=",
        "data.time"
      );
    })
    .join("users", "anomalies.user_id", "=", "users.id")
    .select(
      "anomalies.id",
      "time",
      "value",
      "anomalies.sensor_id",
      "status",
      "confidence",
      "updated_at",
      "notes",
      "name",
      "user_id"
    )
    .modify((builder) => {
      if (status) {
        builder.where({ status: status });
      }
      if (limit) {
        builder.limit(limit);
      }
      if (limit) {
        builder.offset(offset);
      }
      if (from && until) {
        builder.whereBetween("time", [from, until]);
      }
      if (sensor) {
        builder.where({ "anomalies.sensor_id": sensor });
      }
    })
    .then((anomalies) => {
      if (!anomalies || !anomalies.length) {
        res.status(404).json(`No anomalies found.`);
      } else {
        res.json(anomalies);
      }
    });
});

router.get("/:id", function (req, res) {
  const id = req.params.id;

  knex("anomalies")
    .join("data", function () {
      this.on("anomalies.sensor_id", "=", "data.sensor_id").andOn(
        "anomalies.sensor_time",
        "=",
        "data.time"
      );
    })
    .join("users", "anomalies.user_id", "=", "users.id")
    .select(
      "anomalies.id",
      "time",
      "value",
      "anomalies.sensor_id",
      "status",
      "confidence",
      "updated_at",
      "notes",
      "name",
      "user_id"
    )
    .where({ "anomalies.id": id })
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
