/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../db/dbHelper');
var book = require('../models/book');

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO: JMC database connection
    //also system defaults for alt
    Book = mongoose.model('Book', book);
    Book.find({}, function(err, books) {
    	res.render('explore', { title: 'Borrow My Books', buildVersion: pkg.version, books: books });
    });
});

module.exports = router;
