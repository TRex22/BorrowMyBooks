/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var dbHelper = require('../services/dbHelper');
var userHelper = require('../services/userHelper.js');
var book = require('../models/book');

module.exports = function(app, passport) {
    app.get('/explore',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req = userHelper.processUser(req);

                res.render('accounts/profile', { site: app.locals.site, user: req.user, messages: req.flash('info') });
            }
        });
};
