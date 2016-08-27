/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();
var seedDb = require('../db/seedDb');
var userHelper = require('../services/userHelper.js');

module.exports = function(app, passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin',
        function(req, res, next) {
            console.log(req.user);
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    res.render('admin/admin', { site: app.locals.site });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site });
                }
            }
            else{
                res.redirect('/login');
            }
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
