const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  const { page, perPage } = req.query;

  User.find(page, perPage).then((users) => {
    res.json(users);
  });
});

router.post('/', (req, res) => {
  const { name, email, password, role } = req.body;

  User.create(name, email, password, role).then((user) => {
    res.json(user);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findOne(id).then((user) => {
    if (!user) {
      res.status(404).json(`User ${id} is not found.`);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
