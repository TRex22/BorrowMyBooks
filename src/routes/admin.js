/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

//TODO JMC Secure
router.get('/initdb', function(req, res, next) {
  	seedDb.go();
  	response.writeHead(302, {
	  'Location': '/'
	  //add other headers here...
	});
	response.end();
});

module.exports = router;
