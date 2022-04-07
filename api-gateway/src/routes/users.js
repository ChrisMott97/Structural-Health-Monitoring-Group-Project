var express = require('express');
var router = express.Router();
const knexConfig = require('../../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'shm',
    issuerBaseURL: `https://exetercivil.eu.auth0.com/`,
    tokenSigningAlg: 'RS256'
  });

router.get('/',checkJwt, function(req, res) {
  const limit = req.query.limit
  const offset = req.query.offset

  knex('users')
  .select('id', 'name', 'permission')
  .modify((builder) => {
    if(limit) {
      builder.limit(limit)
    }
    if(offset) {
      builder.offset(offset)
    }
  })
  .then(users => {
    if(!users || !users.length){
      res.status(404).json(`No users found.`)
    }else{
      res.json(users)
    }
  })
});

router.get('/:id', function(req, res) {
  const id = req.params.id
  if(!id){
    res.redirect('/users')
  }

  knex('users')
  .select('id', 'name', 'permission')
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
