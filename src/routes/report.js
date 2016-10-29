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
            req = userHelper.processUser(req);

            var iUserReport = new userReport({
                message: req.body.message,
                reason: ["user"],
                priority: req.body.priority,
                date: new Date(),
                adminId: null,
                reportingUserId: req.user._id,
                userId: req.params.userId,
                bookId: null,
                transactionId: null,
                reportClosed: false
            });
            iUserReport.save();

            logger.warn("reported user");
            req.flash('success', "reported userid: " + req.params.userId);

            res.redirect(req.session.returnTo || '/');
        }
    });

    app.post('/transaction/:transactionId/report', wrap(function*(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);

            var transaction = yield transactionHelper.getTransaction(req.params.transactionId);
            var book = yield bookHelper.getBook(transaction.bookId);

            var iUserReport = new userReport({
                message: req.body.message,
                reason: ["transaction"],
                priority: req.body.priority,
                date: new Date(),
                adminId: null,
                reportingUserId: req.user._id,
                userId: transaction.fromUserId, //todo: jmc check
                bookId: transaction.bookId,
                transactionId: req.params.transactionId,
                reportClosed: false
            });
            iUserReport.save();

            logger.warn("reported user");
            req.flash('success', "reported user");

            res.redirect(req.session.returnTo || '/');
        }
    }));

    app.post('/book/:bookId/report', wrap(function*(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);

            var book = yield bookHelper.getBook(req.params.bookId);

            var iUserReport = new userReport({
                message: req.body.message,
                reason: ["book"],
                priority: req.body.priority,
                date: new Date(),
                adminId: null,
                reportingUserId: req.user._id,
                userId: book.userId, 
                bookId: req.params.bookId,
                transactionId: null,
                reportClosed: false
            });
            iUserReport.save();

            logger.warn("reported user");
            req.flash('success', "reported user");
        }
    }));
}
