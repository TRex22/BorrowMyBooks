/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Borrow My Books', buildVersion: pkg.version });
});

module.exports = router;
