var express = require('express');
var router = express.Router();
const knexConfig = require('../../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);
const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer');

var ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: '***REMOVED***',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***',
  scope: 'read:users update:users create:users'
});

router.get('/', function(req, res) {
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

router.post('/', function(req, res) {
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password
  let role = req.body.role

  console.log(name)
  console.log(email)
  console.log(password)
  console.log(role)
  console.log("Authenticated management client")

  auth0.createUser({
    email: email,
    name: name,
    password: password,
    connection: "Username-Password-Authentication"
  })
  .then(function (user) {
    console.log(user)
    auth0.assignRolestoUser({id: user.user_id}, {roles: [role]})
    .then(function(result){
      console.log("Added role")
      res.json(user)
    })
  })
  .catch(function (err) {
    console.log("Create user error!")
    console.log(err)
  });
})

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
