var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var bookHelper = require('../services/bookHelper');
var messageHelper = require('../services/messageHelper');

var mongoose = require('../config/db.js').mongoose;
var userRating = mongoose.model('UserRating', require('../models/userRating'));

module.exports = function(app, passport) {
    app.post('/user/:userId/rate', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;

            var iUserRating = new userRating({
                userId: req.params.userId,
                Date: new Date(),
                TransactionId: null,
                Rating: req.body.rating,
                RaterId: req.user._id
            });
            iUserRating.save();

            logger.warn("rated user");

            req = userHelper.processUser(req);
            req.flash('success', "created user rating");
            userHelper.logUserAction("rated user", req.user._id, null, null, null);
            res.redirect(req.session.returnTo || '/');
        }
    });

    app.post('/transaction/:transactionId/rate', function(req, res, next) {
        if (userHelper.auth(req, res, app.locals.site)) {
            req.user.isMain = true;

            var iUserRating = new userRating({
                userId: null,
                Date: new Date(),
                TransactionId: req.params.transactionId,
                Rating: req.body.rating,
                RaterId: req.user._id
            });
            iUserRating.save();

            logger.warn("rated user");

            req = userHelper.processUser(req);
            req.flash('success', "created user rating"  );
            userHelper.logUserAction("rated transaction", req.user._id, null, null, null);
            res.redirect(req.session.returnTo || '/');
        }
    });
}
