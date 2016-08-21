/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO: JMC database connection
    //also system defaults for alt
    var books = [];
    res.render('explore', { title: 'Borrow My Books', buildVersion: pkg.version, books: books });
});

module.exports = router;
