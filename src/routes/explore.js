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

/*var callback = {};
dbHelper.find("SystemDefaults", {}, callback) {
    if (!callback.data.err) {
        dbHelper.find("Book", {}, callback) {
            res.render('explore', { title: 'Borrow My Books', buildVersion: pkg.version, books: callback.data.books, defaults: callback.data.defaults });
        }
    } else {
        res.status(500);
        url = req.url;
        logger.error("Error Message: code(500) %s", error);
        res.render('error.ejs', { title: '500: Internal Server Error', url: url, statusCode: 500, 'buildVersion': pkg.version });
    }
}*/