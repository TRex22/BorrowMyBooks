/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var seedDb = require('../db/seedDb');
var clearDb = require('../db/clearDb');
var userHelper = require('../services/userHelper.js');
var statHelper = require('../services/statHelper.js');

var mongoose = require('../config/db.js').mongoose;
var book = require('../models/book');
var transaction = require('../models/transaction');

module.exports = function(app, passport) {
    app.get('/transaction/mine', function(req, res) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            var Transaction = mongoose.model('Transaction', transaction);
            var Book = mongoose.model('Book', book);

            Transaction.find({ $or: [{ fromUserId: req.user.userId }, { toUserId: req.user.userId }] }, function(err, transactions) {
                /* istanbul ignore next */
                if (err) throw err; //todo fix 

                var fromTransactions = [];
                var toTransactions = [];

                for (var i = 0; i < transactions.length; i++) {
                    /* Book.findOne({ _id: transactions[i].bookId }, function(err, book) {
                        
                        if (err) throw err; //todo fix 

                        transactions[i].book = book;
                    });*/

                    if (transactions[i].fromUserId === req.user.userId) {
                        fromTransactions.push(transactions[i]);
                    } else if (transactions[i].toUserId === req.user.userId) {
                        toTransactions.push(transactions[i]);
                    }
                }

                res.render('transaction/transaction-mine', { site: app.locals.site, fromTransactions: fromTransactions, toTransactions: toTransactions, user: req.user });
            });
        }
    });
};
