/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

module.exports = function(passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    router.get('/', passport.authenticate('admin', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            res.render('admin', { title: 'Borrow My Books', buildVersion: pkg.version });
        });
    /* istanbul ignore next */ //TODO: JMC think about this
    router.get('/initdb', passport.authenticate('admin', {
            successRedirect: '/admin/initdb',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            seedDb.go();
            res.redirect('/');
        });
    return router;
};
