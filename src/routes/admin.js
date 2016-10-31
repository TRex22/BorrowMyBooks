/* jshint node: true */
var logger = require("../logger/logger");
var express = require('express');
var pkg = require('../package');
var config = require('../config.json');
var router = express.Router();
var clearDb = require('../db/clearDb');
var userHelper = require('../services/userHelper.js');
var statHelper = require('../services/statHelper.js');

var wrap = require('co-express');
var util = require('util');

var mongoose = require('../config/db.js').mongoose;
var sysDefault = mongoose.model('SystemDefaults', require('../models/systemDefaults'));
var userHelper = require('../services/userHelper');
var messageHelper = require('../services/messageHelper');
var userMessage = mongoose.model('UserMessage', require('../models/userMessage'));
var systemMessage = mongoose.model('SystemMessage', require('../models/systemMessage'));
var transactionHelper = require('../services/transactionHelper.js');
var bookHelper = require('../services/bookHelper.js');

module.exports = function(app, passport) {
    app.get('/admin',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                userHelper.logUserAction("Admin logged into admin section", req.user._id, null, null, null);
                res.render('admin/admin', { site: app.locals.site, user: req.user, req: req });
            }
        }
    );

    /* istanbul ignore next */
    app.get('/admin/resetdb',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                logger.warn("started db reset");
                /*clearDb.go();*/
                var clearDb = require('../db/clearDb').go();
                //wait 2 seconds
                console.log("Please wait 2 seconds.")
                setTimeout(function() {
                    var seed = require('../db/seedDb');
                }, 2000);

                req.flash('warn', 'database reset');
                userHelper.logUserAction("Admin reset db", req.user._id, null, null, null);
                res.redirect(req.session.returnTo || '/');
            }
        }
    );

    app.get('/admin/system-defaults',
        function(req, res, next) {
            /* istanbul ignore next */
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                res.render('admin/system-defaults', { site: app.locals.site, user: req.user, req: req });
            }
        }
    );

    app.get('/admin/reported-users',
        wrap(function*(req, res, next) {
            /* istanbul ignore next */
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);

                var reportedUsers = yield userHelper.getReportedUsers();
                var openReports = [];
                var closedReports = [];
                var report = {};

                for (var i = 0; i < reportedUsers.openReports.length; i++) {
                    report = reportedUsers.openReports[i];

                    if (reportedUsers.openReports[i].adminId) {
                        report.admin = yield userHelper.getUser(reportedUsers.openReports[i].adminId);
                    }

                    report.reportingUser = yield userHelper.getUser(reportedUsers.openReports[i].reportingUserId);
                    report.user = yield userHelper.getUser(reportedUsers.openReports[i].userId);

                    if (reportedUsers.openReports[i].bookId) {
                        report.book = yield bookHelper.getBook(reportedUsers.openReports[i].bookId);
                    }

                    if (reportedUsers.openReports[i].transactionId) {
                        report.transaction = yield transactionHelper.getTransaction(reportedUsers.openReports[i].transactionId);
                    }

                    openReports.push(report);
                }

                for (var i = 0; i < reportedUsers.closedReports.length; i++) {
                    report = reportedUsers.closedReports[i];

                    if (reportedUsers.closedReports[i].adminId) {
                        report.admin = yield userHelper.getUser(reportedUsers.closedReports[i].adminId);
                    }

                    report.reportingUser = yield userHelper.getUser(reportedUsers.closedReports[i].reportingUserId);
                    report.user = yield userHelper.getUser(reportedUsers.closedReports[i].userId);


                    if (reportedUsers.closedReports[i].bookId) {
                        report.book = yield bookHelper.getBook(reportedUsers.closedReports[i].bookId);
                    }

                    if (reportedUsers.closedReports[i].transactionId) {
                        report.transaction = yield transactionHelper.getTransaction(reportedUsers.closedReports[i].transactionId);
                    }

                    closedReports.push(report);
                }

                var reports = {
                    openReports: openReports,
                    closedReports: closedReports
                };

                res.render('reports/reported-users', { site: app.locals.site, user: req.user, req: req, reports: reports });
            }
        })
    );


    app.get('/admin/view-users',
        wrap(function*(req, res, next) {
            /* istanbul ignore next */
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);

                var users = yield userHelper.getUsers();

                res.render('admin/view-users', { site: app.locals.site, user: req.user, req: req, users: users });
            }
        })
    );

    app.post('/admin/system-defaults',
        function(req, res, next) {
            /* istanbul ignore next */
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                //update system defaults and then re-render the page

                sysDefault.findOne({}).exec(function(err, defaults) { //there should only be one set of defaults
                    if (err) {
                        logger.error(err);
                    };

                    /* istanbul ignore next */
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
                        req.flash('warn', 'updated system defaults.');
                        userHelper.logUserAction("Admin updated system defaults", req.user._id, null, null, null);
                        res.render('admin/system-defaults', { site: app.locals.site, user: req.user, req: req });
                    }
                });
            }
        }
    );

    app.get('/admin/system-information',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                //use socket.io
                //TODO: get mongo info
                //TODO: get node server info https://nodejs.org/en/docs/guides/simple-profiling/

                /*statHelper.vmstat();*/

                var info = require('simple-node-info');
                req = userHelper.processUser(req);
                var sysinfo = info.getStat();
                userHelper.logUserAction("Admin checked system information", req.user._id, null, null, null);
                res.render('admin/sys-info', { site: app.locals.site, user: req.user, sysinfo: sysinfo, socketvar: 'load averages', jquery: true, socket: true, req: req });
            }
        }
    );
};
