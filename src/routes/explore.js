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

    app.get('/explore/mine', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            var Book = mongoose.model('Book', book);

            Book.find({}, function(err, books) {
                var usrBooks = [];
                for (var i = 0; i < books.length; i++) {
                    if (books[i].userId === "" + req.user._id) {
                        usrBooks.push(books[i]);
                    }
                }
                res.render('explore/explore-mine', { site: app.locals.site, books: usrBooks, user: req.user });
            });
        }
    });
};
