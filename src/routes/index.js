/* jshint node: true */
var express = require('express');
var config = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Borrow My Books', buildVersion: config.buildVersion });
});

module.exports = router;
