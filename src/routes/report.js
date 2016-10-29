var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var bookHelper = require('../services/bookHelper');
var messageHelper = require('../services/messageHelper');

var mongoose = require('../config/db.js').mongoose;
var user = mongoose.model('User', require('../models/user'));
var userMessage = mongoose.model('UserMessage', require('../models/userMessage'));
var systemMessage = mongoose.model('SystemMessage', require('../models/systemMessage'));
var userReport = mongoose.model('UserReport', require('../models/userReport'));

module.exports = function(app, passport) {
    app.get('/profile/reports',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req.user.isMain = true;
                req = userHelper.processUser(req);

                var userReports = yield userHelper.getUserReports(req.user._id);
                for (var i = 0; i < userReports.length; i++) {
                    if (userReports[i].bookId) {
                        userReports[i].book = yield bookHelper.getBook(userReports[i].bookId);
                    }

                    if (userReports[i].transactionId) {
                        userReports[i].transaction = yield transactionHelper.getTransaction(userReports[i].transactionId);
                    }

                    userReports[i].reportingUser = yield userHelper.getUser(userReports[i].reportingUserId);
                }

                res.render('reports/user-reports', { site: app.locals.site, user: req.user, userReports: userReports, req: req });
            }
        })
    );

    app.get('/user/:userId/reports',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                var userReports = yield userHelper.getUserReports(req.params.userId);
                for (var i = 0; i < userReports.length; i++) {
                    if (userReports[i].bookId) {
                        userReports[i].book = yield bookHelper.getBook(userReports[i].bookId);
                    }

                    if (userReports[i].transactionId) {
                        userReports[i].transaction = yield transactionHelper.getTransaction(userReports[i].transactionId);
                    }

                    userReports[i].reportingUser = yield userHelper.getUser(userReports[i].reportingUserId);
                }

                res.render('reports/user-reports', { site: app.locals.site, user: req.user, userReports: userReports, req: req });
            }
        })
    );

    app.post('/user/:userId/report', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;

            /*var iUserMessage = new userMessage({
                message: req.body.message,
                date: new Date(),
                priority: req.body.priority,
                adminId: null,
                fromUserId: req.user._id,
                toUserId: req.params.userId,
                bookId: null,
                transactionId: null
            });
            iUserMessage.save();

            logger.warn("created user message");

            req = userHelper.processUser(req);
            req.flash('success', "created message to userid: " + req.params.userId);

            res.redirect(req.session.returnTo || '/');*/
        }
    });


    app.get('/transaction/:transactionId/report',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req = userHelper.processUser(req);
                /*res.render('messages/transaction-message', { site: app.locals.site, user: req.user, req: req, transactionId: req.params.transactionId });*/
            }
        }
    );

    app.post('/transaction/:transactionId/report', wrap(function*(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);

            // var transaction = yield transactionHelper.getTransaction(req.params.transactionId);

            // var iUserMessage = new userMessage({
            //     message: req.body.message,
            //     date: new Date(),
            //     priority: req.body.priority,
            //     adminId: null,
            //     fromUserId: transaction.fromUserId,
            //     toUserId: transaction.toUserId,
            //     bookId: transaction.bookId,
            //     transactionId: req.params.transactionId
            // });
            // iUserMessage.save();

            // logger.warn("created user message for a transaction");

            // req.flash('success', "created message for transactionID: " + req.params.transactionId);
            // res.redirect(req.session.returnTo || '/');
        }
    }));
}
