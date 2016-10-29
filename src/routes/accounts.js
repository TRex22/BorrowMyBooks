var pkg = require('../package');
var config = require('../config');
var logger = require("../logger/logger");
var wrap = require('co-express');

var userHelper = require('../services/userHelper');
var mongoose = require('../config/db.js').mongoose;
var user = mongoose.model('User', require('../models/user'));

module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        req = userHelper.processUser(req);
        res.render('accounts/login.ejs', { 'site': app.locals.site, user: req.user, req: req });
    });

    app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            req = userHelper.processUser(req);
            userHelper.logUserAction("logged in", req.user._id, null, null, null);
            res.redirect(req.session.returnTo || '/');
        });

    app.get('/signup', function(req, res) {
        req = userHelper.processUser(req);
        res.render('accounts/signup.ejs', { 'site': app.locals.site, user: req.user, req: req });
    });

    app.post('/signup', passport.authenticate('signup', {
            failureRedirect: '/signup',
            failureFlash: true
        }),
        function(req, res) {
            userHelper.logUserAction("Signed up for an account", req.user._id, null, null, null);
            res.redirect(req.session.returnTo || '/');
        });

    app.get('/profile',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req.user.isMain = true;
                req = userHelper.processUser(req);

                var userLog = yield userHelper.getUserLog(req.user._id);
                var userStats = yield userHelper.getUserActivity(req.user._id);

                res.render('accounts/user', { site: app.locals.site, user: req.user, req: req, userLog: userLog, userStats: userStats });
            }
        })
    );

    app.get('/profile/settings',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req.user.isMain = true;
                req = userHelper.processUser(req);
                res.render('accounts/user-settings', { site: app.locals.site, user: req.user, req: req });
            }
        }
    );

    app.post('/profile/settings',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req.user.isMain = true;
                user.findOne({ userId: req.user.userId },
                    function(err, user) {
                        /* istanbul ignore next */
                        if (err) req.flash('error', '' + err); //todo fix

                        /* istanbul ignore next */
                        if (req.body.username) {
                            user.username = req.body.username;
                        }
                        /* istanbul ignore next */
                        if (req.body.fullname) {
                            user.name = req.body.fullname;
                        }
                        /* istanbul ignore next */
                        if (req.body.email) {
                            user.email = req.body.email;
                        }
                        /* istanbul ignore next */
                        if (req.body.address) {
                            user.address = req.body.address;
                        }
                        /* istanbul ignore next */
                        if (req.body.phone) {
                            user.phone = req.body.phone;
                        }
                        /* istanbul ignore next */
                        if (req.body.interests) {
                            user.interests = req.body.interests;
                        }

                        req.user = user;
                        req.session.user = user;
                        user.save();
                    });

                logger.warn("user updated info");
                req.flash('warn', 'User Info Updated');

                userHelper.logUserAction("You updated user information", req.user._id, null, null, null);
                res.redirect(req.session.backURL || '/');
            }
        }
    );

    app.get('/user/:userId',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site)) {
                req = userHelper.processUser(req);
                var userInfo;
                user.isMain = false;
                try {
                    userInfo = yield userHelper.getUser(req.params.userId);
                    if (userInfo) {
                        var userLog = yield userHelper.getUserLog(userInfo._id);
                        var userStats = yield userHelper.getUserActivity(userInfo._id);

                        res.render('accounts/user', { site: app.locals.site, user: req.user, userInfo: userInfo, req: req, userLog: userLog, userStats: userStats });
                    } else {
                        req.flash('error', "No user of that id.");
                        res.redirect(req.session.backURL || '/');
                    }

                } catch (e) {
                    logger.warn(e);
                    req.flash('error', "No user of that id.");
                    res.redirect(req.session.backURL || '/');
                }
            }
        })
    );

    app.get('/user/:userId/settings',
        wrap(function*(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                req = userHelper.processUser(req);
                var userInfo;
                user.isMain = false;
                try {
                    userInfo = yield userHelper.getUser(req.params.userId);

                    if (userInfo) {
                        res.render('accounts/user-settings', { site: app.locals.site, user: req.user, userInfo: userInfo, req: req });
                    } else {
                        req.flash('error', "No user of that id.");
                        res.redirect(req.session.backURL || '/');
                    }

                } catch (e) {
                    logger.warn(e);
                    req.flash('error', "No user of that id.");
                    res.redirect(req.session.backURL || '/');
                }
            }
        })
    );

    app.post('/user/:userId/settings',
        function(req, res, next) {
            if (userHelper.auth(req, res, app.locals.site, true)) {
                user.isMain = false;
                user.findOne({ userId: req.params.userId },
                    function(err, user) {
                        /* istanbul ignore next */
                        if (err) {
                            logger.error(err);
                            throw err;
                        } //todo fix

                        /* istanbul ignore next */
                        if (req.body.username) {
                            user.username = req.body.username;
                        }
                        /* istanbul ignore next */
                        if (req.body.fullname) {
                            user.name = req.body.fullname;
                        }
                        /* istanbul ignore next */
                        if (req.body.email) {
                            user.email = req.body.email;
                        }
                        /* istanbul ignore next */
                        if (req.body.address) {
                            user.address = req.body.address;
                        }
                        /* istanbul ignore next */
                        if (req.body.phone) {
                            user.phone = req.body.phone;
                        }
                        /* istanbul ignore next */
                        if (req.body.interests) {
                            user.interests = req.body.interests;
                        }

                        user.save();
                    });

                logger.warn("admin updated info");
                req.flash('warn', 'User Info Updated');
                userHelper.logUserAction("Admin updated user information", req.user._id, null, null, null);
                userHelper.logUserAction("Admin updated user information", req.params.userId, null, null, null);
                res.redirect('/user/' + req.params.userId);
            }
        }
    );

    app.get('/logout', function(req, res) {
        req.logout();
        req.flash('success', 'You logged out successfully');
        req = userHelper.processUser(req, true);
        res.redirect('/');
    });

    app.post('/logout', function(req, res) {
        req.logout();
        req.flash('success', 'You logged out successfully');
        userHelper.logUserAction("logged out", req.user._id, null, null, null);
        req = userHelper.processUser(req, true);
        res.redirect('/');
    });
};
