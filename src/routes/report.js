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

module.exports = function(app, passport) {
    app.get('/admin/reports',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                var messages = {};
                req.user.isMain = true;

/*                messages.systemMessages = yield messageHelper.getSystemMessages(req.user._id, req.user.isAdmin);
                for (var i = 0; i < messages.systemMessages.length; i++) {
                    messages.systemMessages[i].admin = yield userHelper.getUser(messages.systemMessages[i].adminId);
                }

                messages.userMessages = yield messageHelper.getUserMessages(req.user._id, req.user.isAdmin);
                for (var i = 0; i < messages.userMessages.length; i++) {
                    messages.userMessages[i].fromuser = yield userHelper.getUser(messages.userMessages[i].fromUserId);
                    messages.userMessages[i].toUser = yield userHelper.getUser(messages.userMessages[i].toUserId);

                    if (messages.userMessages[i].bookId) {
                        messages.userMessages[i].book = yield bookHelper.getBook(messages.userMessages[i].bookId);
                    }
                }

                if (!messages) messages = {};

                req = userHelper.processUser(req);
                res.render('messages/messages', { site: app.locals.site, user: req.user, messages: messages, req: req });*/
            }
        })
    );

    app.get('/user/:userId/report',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req = userHelper.processUser(req);
                /*res.render('messages/user-message', { site: app.locals.site, user: req.user, req: req, userId: req.params.userId });*/
            }
        }
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
