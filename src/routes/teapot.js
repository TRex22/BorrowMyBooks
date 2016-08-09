/* jshint node: true */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(418).send('I want to be a teapot');
  console.log('Oh no!');
});


//
//501 will say the voucher does not exist

module.exports = router;
