/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var seedDb = require('../db/seedDb');
var userHelper = require('../services/userHelper.js');

module.exports = function(app, passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin',
        function(req, res, next) {
            /*console.log(req.user);*/
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    res.render('admin/admin', { site: app.locals.site });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin/initdb', passport.authenticate('local', {
            successRedirect: '/admin/initdb',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res, next) {
            seedDb.go();
            res.redirect('/');
        }
    );

    app.get('/admin/system-defaults',
        function(req, res, next) {
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    app.locals.site.themes = config.themes;
                    res.render('admin/system-defaults', { site: app.locals.site });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

    app.post('/admin/system-defaults',
        function(req, res, next) {
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    //update system defaults and then re-render the page

                    sysDefault.findOne({}).exec(function(err, defaults) { //there should only be one set of defaults
                        if (err) throw err; //TODO: FIX

                        if (defaults.DefaultTheme) {
                            defaults.DefaultTheme = req.body.defaultTheme;
                            defaults.Title = req.body.title;
                            defaults.DefaultProfilePictureURL = req.body.defaultProfilePictureURL;
                            defaults.DefaultBookPictureURL = req.body.defaultBookPictureURL;
                            defaults.DefaultBrandingText = req.body.defaultBrandingText;

                            app.locals.site.defaults = defaults;
                        }
                    });
                    app.locals.site.themes = config.themes;
                    res.render('admin/system-defaults', { site: app.locals.site });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

};
