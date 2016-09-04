/* jshint node: true */
var logger = require("../logger/logger");

var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');
var Book = mongoose.model('Book', require('../models/book'));

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
        if (userHelper.auth(req, res, app.locals.site)) {
            if (req.body) { //TODO check and perhpas fix this
                var iBook = new Book({
                    title: req.body.title,
                    author: req.body.author,
                    userId: req.user.userId,
                    noAvailable: req.body.noAvailable,
                    isAvailable: req.body.isAvailable,
                    interests: req.body.interests,
                    picURL: req.body.picURL,
                    ISBN: req.body.ISBN,
                    publishDate: app.locals.site.moment(req.body.publishDate, 'DD-MM-YYYY'),
                    creationDate: new Date(),
                    language: req.body.language,
                    edition: req.body.edition,
                    loanPrice: req.body.loanPrice,
                    sellPrice: req.body.sellPrice,
                    isForLoan: req.body.isForLoan,
                    isForSale: req.body.isForSale,
                    isSold: req.body.isSold,
                    isOnLoan: req.body.isOnLoan,
                    summary: req.body.summary
                });
                iBook.bookId = iBook.generateUUID();
                iBook.save();
                logger.warn("created book");
            }

            res.redirect('/book/' + iBook.bookId);
        }
    });

    app.get('/book/:bookId', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);

        Book.findOne({ _id: req.params.bookId }, function(err, book) {
            if (book) {
                res.render('book/book', { site: app.locals.site, book: book, user: req.user });
            } else {
                res.redirect('/explore');
            }
        });
    });

};
