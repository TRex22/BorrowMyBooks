/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

//TODO JMC Secure
router.get('/', function(req, res, next) {
	res.render('admin', { title: 'Borrow My Books', buildVersion: pkg.version });
});
router.get('/initdb', function(req, res, next) {
  	seedDb.go();
  	res.redirect('/');
});

module.exports = router;
  	/*response.writeHead(302, {
	  'Location': '/'
	  //add other headers here...
	});
	response.end();*/