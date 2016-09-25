/* jshint node: true */
var logger = require("../logger/logger");

var express = require('express');
var pkg = require('../package');
var router = express.Router();
var wrap = require('co-express');

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

    app.post('/book/:bookId/rent', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (req.body) { //TODO check and perhpas fix this
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (book) {
                        //check if book is for rent
                        if (book.isForLoan && !book.isOnLoan && book.noAvailable > 0 && book.isAvailable === true) {
                            iTransaction = new transaction({
                                fromUserId: book.userId,
                                toUserId: req.user.userId,
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
                        } else {
                            req.flash('error', 'Book is not for rent.'); //todo fix? how does this work?    
                            res.render('book/book', { site: app.locals.site, book: book, user: req.user });
                        }
                    } else {
                        res.redirect('/explore');
                    }
                });
            }

            res.redirect('/book/' + req.params.bookId);
        }
    });

    app.post('/book/:bookId/return', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (req.body) { //TODO check and perhpas fix this
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (book) {
                        //check if book is for rent and loaned out
                        if (book.isForLoan && book.isOnLoan) {
                            Transaction.findOne({
                                    toUserId: req.user.userId,
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
                                        } else {
                                            req.flash('error', 'Wrong user.'); //todo fix? how does this work?    
                                            res.render('book/book', { site: app.locals.site, book: book, user: req.user });
                                        }
                                    } else {
                                        req.flash('error', 'No such transaction.'); //todo fix? how does this work?    
                                        res.render('book/book', { site: app.locals.site, book: book, user: req.user });
                                    }
                                });
                        } else {
                            req.flash('error', 'Book is not for rent.'); //todo fix? how does this work?    
                            res.render('book/book', { site: app.locals.site, book: book, user: req.user });
                        }
                    } else {
                        res.redirect('/explore');
                    }
                });
            }

            res.redirect('/book/' + req.params.bookId);
        }
    });

    app.post('/book/:bookId/buy', function(req, res, next) {
        //TODO: JMC database connection
        if (userHelper.auth(req, res, app.locals.site)) {
            if (req.body) { //TODO check and perhpas fix this
                Book.findOne({ _id: req.params.bookId }, function(err, book) {
                    if (book) {
                        //check if book is for rent
                        //TODO: check cost and amounts
                        if (book.isForLoan && !book.isOnLoan && book.noAvailable > 0 && book.isAvailable === true) {
                            iTransaction = new transaction({
                                fromUserId: book.userId,
                                toUserId: req.user.userId,
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
                            /*book.isOnLoan = true;*/
                            book.save();
                        } else {
                            req.flash('error', 'Book is not for sale.'); //todo fix? how does this work?    
                            res.render('book/book', { site: app.locals.site, book: book, user: req.user });
                        }
                    } else {
                        res.redirect('/explore');
                    }
                });
            }

            res.redirect('/book/' + req.params.bookId);
        }
    });

    app.get('/book/:bookId', wrap(function*(req, res, next) {
        //TODO: JMC database connection
        //also system defaults for alt
        req = userHelper.processUser(req);

        var book;
        var relatedBooks;

        try {
            book = yield bookHelper.getBook(req.params.bookId);
            relatedBooks = yield bookHelper.getRelatedBooks(req.params.bookId);
            
            if (book) {
                res.render('book/book', { site: app.locals.site, book: book, relatedBooks: relatedBooks, user: req.user });
            } else {
                res.redirect('/explore');
            }

        } catch (e) {
            logger.error(e)
            res.redirect('/explore');
        }
    }));

};
