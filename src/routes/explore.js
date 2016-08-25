/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var book = require('../models/book');

module.exports = function(app, passport, site) {
    router.get('/', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        var Book = mongoose.model('Book', book);

        Book.find({}, function(err, books) {
            res.render('explore', {site: site, books: books });
        });
    });
};


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
