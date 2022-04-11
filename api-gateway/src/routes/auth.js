var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: 'shm',
    issuerBaseURL: `https://exetercivil.eu.auth0.com/`,
    tokenSigningAlg: 'RS256'
  });

router.post('/login', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  axios
  .post('https://exetercivil.eu.auth0.com/oauth/token', {
    grant_type:"password",
    username:username,
    password:password,
    client_id:"KpZx7y5CcCi0fXwsR3V3EIOOGKdyAvKP",
    client_secret:"1wwY7NK0f9s8AsXhC7FZdaskIAbF6LUvkPFvGBg6Gv_4U-mdAWPn-hBozQWHGYdP",
    audience:"shm"
  })
  .then(result => {
    res.send(result.data.access_token)
  })
  .catch(error => {
    res.status(error.response.status).json(`Invalid credentials.`)
  })
});

router.post('/tokens', function(req, res, next){
  const code = req.body.code
  const state = req.body.state
  axios
  .post('https://exetercivil.eu.auth0.com/oauth/token', {
    grant_type:"authorization_code",
    client_id:"KpZx7y5CcCi0fXwsR3V3EIOOGKdyAvKP",
    client_secret:"1wwY7NK0f9s8AsXhC7FZdaskIAbF6LUvkPFvGBg6Gv_4U-mdAWPn-hBozQWHGYdP",
    code: code,
    redirect_uri: "http://localhost"
  })
  .then(result => {
    // res.cookie('access_token',result.data.access_token, { httpOnly: true })
    // res.cookie('refresh_token',result.data.refresh_token, { httpOnly: true })
    res.json({access_token: result.data.access_token, refresh_token: result.data.refresh_token})
    // res.status(200).json("Done")
  })
  .catch(error => {
    res.status(error.response.status).json(`Invalid credentials.`)
  })
})

router.get('/loggedin',checkJwt, function(req, res, next){
  res.json("Logged in.").status(200)
})


module.exports = router;
