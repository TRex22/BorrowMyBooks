var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var messageHelper = require('../services/messageHelper');

var mongoose = require('../config/db.js').mongoose;
var user = mongoose.model('User', require('../models/user'));

module.exports = function(app, passport) {
    app.get('/profile/messages',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                var messages = {};
                req.user.isMain = true;
                req = userHelper.processUser(req);
                messages = messageHelper.getMessages(req.user._id, req.user.isAdmin);
                if (!messages) messages = {};
                if (!messages.systemMessages) messages.systemMessages = [];
                if (!messages.UserMessage) messages.userMessages = [];

                res.render('messages/user-messages', { site: app.locals.site, user: req.user, messages: messages, req: req });
            }
        })
    );

    app.post('/user/:userId/message', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);



        }
    });

    app.post('/messages/admin', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;
            req = userHelper.processUser(req);



        }
    });
}
