var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  knex('users').select().then(users => {
    res.send(users)
  })
});

module.exports = router;
