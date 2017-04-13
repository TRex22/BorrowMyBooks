/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');
var bookHelper = require('../services/bookHelper');
var transactionHelper = require('../services/transactionHelper.js');

var book = require('../models/book');

var wrap = require('co-express');

module.exports = function(app, passport) {
    app.get('/explore', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        var Book = mongoose.model('Book', book);

        Book.find({}, function(err, books) {
            if (err) req.flash('error', '' + err);

            res.render('explore/explore', { site: app.locals.site, books: books, user: req.user, req: req });
        });
    });

    app.get('/explore/mine', wrap(function*(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            var usrBooks = yield bookHelper.getUserBooks(req.user._id);
            var transactionBooks = yield transactionHelper.getTransactionBooks(req.user._id);
            var storeBooks = [];

            for (var i = 0; i < usrBooks.length; i++) {
                var isDuplicate = false;
                for (var j = 0; j < transactionBooks.loanedUsrBooks.length; j++) {
                    if (bookHelper.compareBookObjects(usrBooks[i], transactionBooks.loanedUsrBooks[j])) {
                        isDuplicate = true;
                    }
                }

                if (!isDuplicate) {
                    storeBooks.push(usrBooks[i]);
                }
            }

            if(!transactionBooks.rentedUsrBooks[0]) {
                transactionBooks.rentedUsrBooks = [];
            }

            res.render('explore/explore-mine', { site: app.locals.site, books: storeBooks, transactionBooks: transactionBooks, user: req.user, req: req });
        }
    }));
};
