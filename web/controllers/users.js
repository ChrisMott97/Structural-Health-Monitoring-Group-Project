var express = require("express");
var router = express.Router();
const knexConfig = require("../database/knexfile.js")["development"];
const knex = require("knex")(knexConfig);
const User = require("../models/User");
const axios = require("axios");
const { auth } = require("express-oauth2-jwt-bearer");

var ManagementClient = require("auth0").ManagementClient;
var auth0 = new ManagementClient({
  domain: "***REMOVED***",
  clientId: "***REMOVED***",
  clientSecret:
    "***REMOVED***",
  scope: "read:users update:users create:users",
});

router.get("/", function (req, res) {
  const perPage = req.query.perPage;
  const page = req.query.page;

  User.find(page, perPage).then((users) => {
    res.json(users);
  });
});

router.post("/", function (req, res) {
  const { name, email, password, role } = req.body;

  User.create(name, email, password, role).then((user) => {
    res.json(user);
  });
});

router.get("/:id", function (req, res) {
  const id = req.params.id;

  User.findOne(id).then((user) => {
    if (!user) {
      res.status(404).json(`User ${id} is not found.`);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
