/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');
var book = require('../models/book');

module.exports = function(app, passport) {
    app.get('/book/new', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            res.render('book/new-book', { site: app.locals.site, user: req.user });
        }
    });

    app.post('/book/new', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            res.render('book/new-book', { site: app.locals.site, user: req.user });
        }
    });

    app.get('/book/:bookId', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        var Book = mongoose.model('Book', book);

        Book.findOne({_id: req.params.bookId}, function(err, book) {
            if(book){
                res.render('book/book', { site: app.locals.site, book: book, user: req.user });
            }
            else{
                res.redirect('/explore');
            }
        });
    });

};
