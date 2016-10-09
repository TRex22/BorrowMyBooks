var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var mongoose = require('../config/db.js').mongoose;
var user = mongoose.model('User', require('../models/user'));

module.exports = function(app, passport) {
    app.get('/profile/messages',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req.user.isMain = true;
                req = userHelper.processUser(req);
                res.render('messages/user-messages', { site: app.locals.site, user: req.user, req: req });
            }
        }
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
