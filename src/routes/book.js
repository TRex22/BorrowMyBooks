/* jshint node: true */
var logger = require("../logger/logger");

var express = require('express');
var pkg = require('../package');
var router = express.Router();
var wrap = require('co-express');
var util = require('util');

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');

var bookHelper = require('../services/bookHelper.js');

var Book = mongoose.model('Book', require('../models/book'));
var transaction = require('../models/transaction');
var Transaction = mongoose.model('Transaction', transaction);

module.exports = function(app, passport) {
    app.get('/book/new', function(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            res.render('book/new-book', { site: app.locals.site, user: req.user, req: req });
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
                    userId: req.user._id,
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

                req.flash('success', "created new book, " + iBook.title);
                res.redirect('/book/' + iBook._id);
            }
        }
    });

    app.post('/book/:bookId/rent', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (!req.body.amount) req.body.amount = 1;
            if (req.body) {
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (err) req.flash('error', '' + err);
                    if (book) {
                        //check if book is for rent
                        if (book.isForLoan && !book.isOnLoan && book.noAvailable > 0 && book.isAvailable === true) {
                            iTransaction = new transaction({
                                fromUserId: book.userId,
                                toUserId: req.user._id,
                                bookId: book._id,
                                amount: req.body.amount,
                                cost: req.body.amount * book.loanPrice,
                                isPurchase: false,
                                isRent: true,
                                hasBeenReturned: false,
                                returnDate: null,
                                hasBeenRevoked: false,
                                Date: new Date(),
                                AdminId: null
                            });
                            iTransaction.TransactionId = iTransaction.generateUUID();
                            iTransaction.save();

                            book.noAvailable = book.noAvailable - req.body.amount;
                            /*book.isOnLoan = true;*/
                            book.save();
                            req.flash('success', book.title + " successfully rented.");
                            res.redirect('/book/' + req.params.bookId);
                        } else {
                            req.flash('error', 'Book is not for rent.');
                            res.redirect('/book/' + req.params.bookId);
                        }
                    } else {
                        req.flash('error', 'Book not found.');
                        res.redirect('/explore');
                    }
                });
            } else {
                req.flash('error', 'Incorrect form input');
                res.redirect('/explore');
            }
        }
    });

    app.post('/book/:bookId/return', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (!req.body.amount) req.body.amount = 1;
            if (req.body) {
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (err) req.flash('error', '' + err);
                    if (book) {
                        //check if book is for rent and loaned out
                        if (book.isForLoan && book.isOnLoan) {
                            Transaction.findOne({
                                    toUserId: req.user._id,
                                    bookId: book._id
                                },
                                function(err, itransaction) {
                                    if (itransaction) {
                                        //check if right user
                                        if (itransaction.userId === req.user.userId) {
                                            itransaction.hasBeenReturned = true;
                                            itransaction.returnDate = new Date();
                                            itransaction.save();

                                            book.noAvailable = book.noAvailable + itransaction.amount;
                                            /*book.isOnLoan = false;*/
                                            book.save();
                                            req.flash('success', book.title + " successfully returned.");
                                            res.redirect('/book/' + req.params.bookId);
                                        } else {
                                            req.flash('error', 'Wrong user.'); //todo fix? how does this work?    
                                            res.render('book/book', { site: app.locals.site, book: book, user: req.user, req: req });
                                        }
                                    } else {
                                        req.flash('error', 'No such transaction.'); //todo fix? how does this work?    
                                        res.render('book/book', { site: app.locals.site, book: book, user: req.user, req: req });
                                    }
                                });
                        } else {
                            req.flash('error', 'Book is not for rent.'); //todo fix? how does this work?    
                            res.redirect('/book/' + req.params.bookId);
                        }
                    } else {
                        req.flash('error', 'Book not found.');
                        res.redirect('/explore');
                    }
                });
            }
        }
    });

    app.post('/book/:bookId/buy', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (!req.body.amount) req.body.amount = 1;
            if (req.body) {
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (err) req.flash('error', '' + err);
                    if (book) {
                        //check if book is for rent
                        //TODO: check cost and amounts
                        if (book.isForLoan && !book.isOnLoan && book.noAvailable > 0 && book.isAvailable === true) {
                            iTransaction = new transaction({
                                fromUserId: book.userId,
                                toUserId: req.user._id,
                                bookId: book._id,
                                amount: req.body.amount,
                                cost: req.body.amount * book.loanPrice,
                                isPurchase: true,
                                isRent: false,
                                hasBeenReturned: false,
                                returnDate: null,
                                hasBeenRevoked: false,
                                Date: new Date(),
                                AdminId: null
                            });
                            iTransaction.TransactionId = iTransaction.generateUUID();
                            iTransaction.save();

                            book.noAvailable = book.noAvailable - req.body.amount;
                            book.save();

                            req.flash('success', book.title + " successfully purchased.");
                            res.redirect('/book/' + req.params.bookId);
                        } else {
                            req.flash('error', 'Book is not for sale.'); //todo fix? how does this work?    
                            res.redirect('/book/' + req.params.bookId);
                        }
                    } else {
                        req.flash('error', 'Book not found.');
                        res.redirect('/explore');
                    }
                });
            } else {
                req.flash('error', 'Incorrect form input');
                res.redirect('/explore');
            }
        }
    });

    app.get('/book/:bookId', wrap(function*(req, res, next) {
        req = userHelper.processUser(req);

        var book;
        var bookUser = false;
        var relatedBooks = [];

        try {
            book = yield bookHelper.getBook(req.params.bookId);

            if (book) {
                bookUser = yield userHelper.getUser(book.userId);
                relatedBooks = yield bookHelper.getRelatedBooks(req.params.bookId);

                if (!bookUser || bookUser === null) {
                    bookUser = false;
                }

                res.render('book/book', { site: app.locals.site, book: book, bookUser: bookUser, relatedBooks: relatedBooks, user: req.user, req: req });
            } else {
                req.flash('error', 'Book not found.');
                res.redirect('/explore');
            }

        } catch (e) {
            logger.error(e);
            req.flash('error', "" + e);
            res.redirect('/explore');
        }
    }));

};
