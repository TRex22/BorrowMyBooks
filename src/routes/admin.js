/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var seedDb = require('../db/seedDb');
var userHelper = require('../services/userHelper.js');

var mongoose = require('../config/db.js').mongoose;
var sysDefault = mongoose.model('SystemDefaults', require('../models/systemDefaults'));

module.exports = function(app, passport) {
    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin',
        function(req, res, next) {
            /*console.log(req.user);*/
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    req = userHelper.processUser(req);
                    res.render('admin/admin', { site: app.locals.site, user: req.user });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site, user: req.user });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

    /* istanbul ignore next */ //TODO: JMC think about this
    app.get('/admin/initdb',
        function(req, res, next) {
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    req = userHelper.processUser(req);
                    seedDb.go();
                    res.redirect('/');

                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site, user: req.user });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

    app.get('/admin/system-defaults',
        function(req, res, next) {
            if (req.user) {
                if (userHelper.isAdmin(req.user)) {
                    req = userHelper.processUser(req);
                    res.render('admin/system-defaults', { site: app.locals.site, user: req.user });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site, user: req.user });
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
                    req = userHelper.processUser(req);
                    //update system defaults and then re-render the page

                    sysDefault.findOne({}).exec(function(err, defaults) { //there should only be one set of defaults
                        if (err) throw err; //TODO: FIX

                        if (req.body && defaults) {
                            if (req.body.defaultTheme) {
                                defaults.DefaultTheme = req.body.defaultTheme;
                            }
                            if (req.body.title) {
                                defaults.Title = req.body.title;
                            }
                            if (req.body.defaultProfilePictureURL) {
                                defaults.DefaultProfilePictureURL = req.body.defaultProfilePictureURL;
                            }
                            if (req.body.defaultBookPictureURL) {
                                defaults.DefaultBookPictureURL = req.body.defaultBookPictureURL;
                            }
                            if (req.body.defaultBrandingText) {
                                defaults.DefaultBrandingText = req.body.defaultBrandingText;
                            }

                            app.locals.site.defaults = defaults;
                            defaults.save();

                            res.render('admin/system-defaults', { site: app.locals.site, user: req.user });
                        }
                    });
                } else {
                    res.status(401);
                    url = req.url;
                    res.render('errors/401.ejs', { title: '401: Unauthorized', url: url, statusCode: 401, site: app.locals.site, user: req.user });
                }
            } else {
                res.redirect('/login');
            }
        }
    );

};
