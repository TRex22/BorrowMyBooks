/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

module.exports = function(app, passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin', passport.authenticate('admin', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            res.render('admin', { site: app.locals.site });
        });

    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin/initdb', passport.authenticate('admin', {
            successRedirect: '/admin/initdb',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            seedDb.go();
            res.redirect('/');
        });
};
