var express = require('express');
var router = express.Router();
const axios = require('axios')
const User = require('../models/User')
axios.defaults.withCredentials = true

router.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  if(req.oidc.isAuthenticated()){
    // console.log(req.oidc.user)
    res.locals.user = req.oidc.user
    res.locals.authenticated = true
  }else{
    res.locals.user = null
    res.locals.authenticated = false
  }
  next()
})

router.get('/users', function(req, res, next) {
  User.find().then((users)=>{
    res.render('admin/users', {users: users})
  })
});

router.post('/users', function(req, res, next){
    const {type, name, email, password, role} = req.body
    if (type == 'create'){
        User.create(name, email, password, role).then((result)=>{
          res.render('admin/users', {success:true})
        })
    }
})

module.exports = router;
