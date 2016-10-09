var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var messageHelper = require('../services/messageHelper');

var mongoose = require('../config/db.js').mongoose;
var user = mongoose.model('User', require('../models/user'));
var userMessage = mongoose.model('UserMessage', require('../models/userMessage'));
var systemMessage = mongoose.model('SystemMessage', require('../models/systemMessage'));

module.exports = function(app, passport) {
    app.get('/profile/messages',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                var messages = {};
                req.user.isMain = true;
                req = userHelper.processUser(req);

                messages.systemMessages = yield messageHelper.getSystemMessages(req.user._id, req.user.isAdmin);
                messages.userMessages = yield messageHelper.getUserMessages(req.user._id, req.user.isAdmin);

                if (!messages) messages = {};

                res.render('messages/user-messages', { site: app.locals.site, user: req.user, messages: messages, req: req });
            }
        })
    );

    app.post('/user/:userId/message', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);

            var iUserMessage = new userMessage({
                message: req.body.message,
                date: new Date(),
                priority: req.body.priority,
                adminId: req.body.adminId,
                fromUserId: req.user._id,
                toUserId: req.body.toUserId,
                bookId: req.body.bookId,
                transactionId: req.body.transactionId
            });
            iUserMessage.save();

            logger.warn("created user message");

            req.flash('success', "created message to user , " + req.body.toUserId);
            res.redirect(req.session.returnTo || '/');
        }
    });
}
