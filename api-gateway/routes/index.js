var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Successful, but with buildpacks! and lots of live reload!")
});

module.exports = router;
