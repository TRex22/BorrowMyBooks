/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');
var book = require('../models/book');

module.exports = function(app, passport) {
    app.get('/explore', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        var Book = mongoose.model('Book', book);

        Book.find({}, function(err, books) {
            res.render('explore/explore', { site: app.locals.site, books: books, user: req.user });
        });
    });
};
