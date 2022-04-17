const express = require('express');

const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

axios.defaults.withCredentials = true;

router.use((req, res, next) => {
  // Make `user` and `authenticated` available in templates
  if (req.oidc.isAuthenticated()) {
    res.locals.user = req.oidc.user;
    res.locals.authenticated = true;
  } else {
    res.locals.user = null;
    res.locals.authenticated = false;
  }
  next();
});

router.get('/users', (req, res) => {
  User.find().then((users) => {
    res.render('admin/users', { users });
  });
});

router.post('/users', (req, res) => {
  const { type, name, email, password, role } = req.body;
  if (type === 'create') {
    User.create(name, email, password, role).then(() => {
      res.render('admin/users', { success: true });
    });
  }
});

module.exports = router;
