/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../db/dbHelper');
var book = require('../models/book');
var systemDefaults = require('../models/systemDefaults');

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO: JMC database connection
    //also system defaults for alt
    sysDefault = mongoose.model('SystemDefaults', systemDefaults);
    Book = mongoose.model('Book', book);

    sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
        Book.find({}, function(err, books) {        	
            res.render('explore', { title: 'Borrow My Books', buildVersion: pkg.version, books: books, defaults: defaults});
        });
    });

});

module.exports = router;
