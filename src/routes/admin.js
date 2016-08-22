/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');

var mongoose = require('../config/db.js').mongoose;
var systemDefaults = require('../models/systemDefaults');
sysDefault = mongoose.model('SystemDefaults', systemDefaults);

module.exports = function(passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    router.get('/', passport.authenticate('admin', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            var site = {};
            site.buildVersion = pkg.version;

            sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
                site.defaults = defaults;
                
                res.render('admin', { title: 'Borrow My Books', site: site });
            });
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
