/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var wrap = require('co-express');

var userHelper = require('../services/userHelper.js');
var transactionHelper = require('../services/transactionHelper.js');

module.exports = function(app, passport) {
    app.get('/transaction/mine', wrap(function*(req, res) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req = userHelper.processUser(req);
            var transactions;
            var fromTransactions = [];
            var toTransactions = [];

            try {
                transactions = yield transactionHelper.getTransactions(req.user._id);

                for (var i = 0; i < transactions.length; i++) {
                    if (transactions[i].fromUserId === "" + req.user._id) {
                        fromTransactions.push(transactions[i]);
                    }

                    if (transactions[i].toUserId === "" + req.user._id) {
                        toTransactions.push(transactions[i]);
                    }
                }

                res.render('transaction/transaction-mine', { site: app.locals.site, fromTransactions: fromTransactions, toTransactions: toTransactions, user: req.user, req: req, userInfo: false });
            } catch (e) {
                logger.error(e)
                req.flash('error', '' + e);
                res.redirect('/explore');
            }
        }
    }));
};
