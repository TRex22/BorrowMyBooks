/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var userHelper = require('../services/userHelper.js');

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        req = userHelper.processUser(req);
        res.render('index', { site: app.locals.site, user: req.user, req: req });
    });
};
