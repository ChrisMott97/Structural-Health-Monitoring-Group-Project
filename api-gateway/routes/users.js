var express = require('express');
var router = express.Router();
const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

router.get('/', function(req, res) {
  knex('users')
  .select()
  .then(users => {
    if(!users || !users.length){
      res.status(404).json(`No users found.`)
    }else{
      res.json(users)
    }
  })
});

router.get('/:id', function(req, res) {
  let id = req.params.id

  knex('users')
  .select()
  .where({id: id})
  .first()
  .then(user => {
    if(!user){
      res.status(404).json(`User ${id} is not found.`)
    }else{
      res.json(user)
    }
  })
});
module.exports = router;
