/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

//TODO JMC Secure
router.get('/initdb', function(req, res, next) {
  	seedDb.go();
  	res.render('index', { title: 'Borrow My Books init', buildVersion: pkg.version });
});

module.exports = router;
