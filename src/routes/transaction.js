/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var wrap = require('co-express');

var mongoose = require('../config/db.js').mongoose;
var book = require('../models/book');
var transaction = require('../models/transaction');

var userHelper = require('../services/userHelper.js');
var statHelper = require('../services/statHelper.js');
var transactionHelper = require('../services/transactionHelper.js');

var util = require('util');

module.exports = function(app, passport) {
    app.get('/transaction/mine', wrap(function*(req, res) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);

            var transactions;

            try {
                transactions = yield transactionHelper.getTransactions(req.user.userId);

                var fromTransactions = [];
                var toTransactions = [];

                for (var i = 0; i < transactions.length; i++) {
                    if (transactions[i].fromUserId === req.user.userId) {
                        fromTransactions.push(transactions[i]);
                    } else if (transactions[i].toUserId === req.user.userId) {
                        toTransactions.push(transactions[i]);
                    }
                }

                res.render('transaction/transaction-mine', { site: app.locals.site, fromTransactions: fromTransactions, toTransactions: toTransactions, user: req.user });
            } catch (e) {
                if (e) throw e; //todo fix 
            }

            /*res.render('transaction/transaction-mine', { site: app.locals.site, fromTransactions: fromTransactions, toTransactions: toTransactions, user: req.user });*/
        }
    }));
};
