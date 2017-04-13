/*SOURCE: code from https://github.com/knoldus/Node.js_UserLogin_Template*/
var logger = require("../logger/logger");
var mongoose = require('../config/db.js').mongoose;
var userHelper = require('../services/userHelper');
var schoolDomain = mongoose.model('SchoolDomain', require('../models/schoolDomain'));

var wrap = require('co-express');
var co = require('co');

// local authentication
// For more details go to https://github.com/jaredhanson/passport-local
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;

// Facebook authentication
// For more details go to https://github.com/jaredhanson/passport-facebook
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = "<Insert Your Key Here>"
var FACEBOOK_APP_SECRET = "<Insert Your Secret Key Here>";

// Twitter authentication
// For more details go to https://github.com/jaredhanson/passport-twitter
var TwitterStrategy = require('passport-twitter').Strategy;
var TWITTER_CONSUMER_KEY = "<Insert Your Key Here>";
var TWITTER_CONSUMER_SECRET = "<Insert Your Secret Key Here>";

// Google authentication
// For more details go to https://github.com/jaredhanson/passport-google-oauth
var GOOGLE_CONSUMER_KEY = "<Insert Your Key Here>";
var GOOGLE_CONSUMER_SECRET = "<Insert Your Secret Key Here>";
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

//TODO: passport-github

var User = require('../models/user');

module.exports = function(app, passport) {

    // Maintaining persistent login sessions
    // serialized  authenticated user to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local', new LocalStrategy({
            usernameField: 'username',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({ $or: [{ email: username }, { username: username }] }, function(err, user) {
                    if (err) {
                        logger.err(err);
                        req = userHelper.processUser(req);
                        return done(err, req.flash('error', '' + err));
                    }
                    if (!user) {
                        logger.warn('Incorrect username.');
                        req = userHelper.processUser(req);
                        return done(null, false, req.flash('error', 'User does not exist.'));
                    }

                    if (!user.verifyPassword(password)) {
                        logger.warn('Incorrect password.');
                        req = userHelper.processUser(req);
                        return done(null, false, req.flash('error', 'Enter correct password'));
                    }

                    user.lastLoginDate = new Date();
                    user.save();

                    req = userHelper.processUser(req);
                    return done(null, user, req.flash('success', 'user logged in.'));

                });
            });

        }));

    passport.use('basic', new BasicStrategy( //TODO: JMC fix
        function(username, password, done) {
            User.findOne({ $or: [{ email: username }, { username: username }] }, function(err, user) {
                if (err) {
                    user.isLoggedIn = false;
                    return done(err, req.flash('error', '' + err));
                }
                if (!user) {
                    user.isLoggedIn = false;
                    logger.warn('User does not exist');
                    return done(null, false, req.flash('error', 'User does not exist.'));
                }

                if (!user.verifyPassword(password)) {
                    logger.warn('Incorrect password.');
                    user.isLoggedIn = false;
                    return done(null, false, req.flash('error', 'Enter correct password'));
                }

                user.lastLoginDate = new Date();
                user.save();

                req = userHelper.processUser(req);
                return done(null, user, req.flash('success', 'user logged in.'));
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            usernameField: 'username',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            process.nextTick(function() {

                if (!req.user) {
                    User.findOne({ $or: [{ email: username }, { username: username }] }, wrap(function*(err, user) {
                        if (err) {
                            return done(err, req.flash('error', '' + err));
                        }
                        if (user) {
                            return done(null, false, req.flash('error', 'User already exists', null));
                        } else {
                            var newUser = yield userHelper.createNewUser(username, password, req.body);
                            newUser.save(function(err) {
                                if (err)
                                    throw err; //TODO JMC Fix

                                schoolDomain.findOne({}, function(err, domainObj) {
                                    var isStudent = domainObj.isStudentEmail(iUser.email);

                                    if (isStudent) {
                                        newUser.money = 1000;
                                        newUser.isStudent = true;
                                    } else {
                                        newUser.money = 0;
                                        newUser.isStudent = false;
                                    }

                                    if (isStudent) {
                                        req.flash('success', 'Because You are a student, we have given you R1000 store credit');
                                    }

                                });

                                req.user = newUser;
                                req = userHelper.processUser(req);
                                logger.warn("created new user");

                                return done(null, newUser, req.flash('success', 'created new user'));
                            });
                        }

                    }));
                } else {
                    co(function*() {
                        var newUser = yield userHelper.createNewUser(username, password, req.body);
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            schoolDomain.findOne({}, function(err, domainObj) {
                                var isStudent = domainObj.isStudentEmail(iUser.email);

                                if (isStudent) {
                                    newUser.money = 1000;
                                    newUser.isStudent = true;
                                } else {
                                    newUser.money = 0;
                                    newUser.isStudent = false;
                                }

                                if (isStudent) {
                                    req.flash('success', 'Because You are a student, we have given you R1000 store credit');
                                }

                            });

                            req.user = newUser;
                            req = userHelper.processUser(req);
                            logger.warn("created new user");

                            return done(null, newUser, req.flash('success', 'created new user'));
                        });
                    })
                }

            });

        }));

    // Use the FacebookStrategy within Passport.
    // Strategies in Passport require a `verify` function, which accept
    // credentials (in this case, an accessToken, refreshToken, and Facebook
    // profile), and invoke a callback with a user object.
    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8080/auth/facebook/callback"
        },
        function(req, accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...

            process.nextTick(function() {
                if (!req.user) {
                    User.findOne({ 'user.email': profile.emails[0].value }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        } else {
                            var newUser = new User();
                            newUser.user.username = profile.displayName;
                            newUser.user.email = profile.emails[0].value;
                            newUser.user.name = ''
                            newUser.user.address = ''

                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });
                } else {
                    var user = req.user;
                    user.user.username = profile.displayName;
                    user.user.email = profile.emails[0].value;
                    user.user.name = ''
                    user.user.address = ''

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }
    ));

    // Use the TwitterStrategy within Passport.
    // Strategies in passport require a `verify` function, which accept
    // credentials (in this case, a token, tokenSecret, and Twitter profile), and
    // invoke a callback with a user object.
    passport.use(new TwitterStrategy({
            consumerKey: TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            callbackURL: "http://192.168.1.101:8080/auth/twitter/callback"
        },
        function(req, token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function() {

                if (!req.user) {
                    User.findOne({ 'user.username': profile.displayName }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        } else {
                            var newUser = new User();
                            newUser.user.username = profile.displayName;
                            newUser.user.name = ''
                            newUser.user.address = ''

                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });
                } else {
                    var user = req.user;
                    user.user.username = profile.displayName;
                    user.user.name = ''
                    user.user.address = ''

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }
    ));

    // Use the GoogleStrategy within Passport.
    // Strategies in Passport require a `verify` function, which accept
    // credentials (in this case, an accessToken, refreshToken, and Google
    // profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CONSUMER_KEY,
            clientSecret: GOOGLE_CONSUMER_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback"
        },
        function(req, accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function() {

                if (!req.user) {
                    User.findOne({ 'user.email': profile.emails[0].value }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        } else {
                            var newUser = new User();
                            newUser.user.username = profile.displayName;
                            newUser.user.email = profile.emails[0].value;
                            newUser.user.name = ''
                            newUser.user.address = ''

                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });
                } else {
                    var user = req.user;
                    user.user.username = profile.displayName;
                    user.user.email = profile.emails[0].value;
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });

        }

    ));

};
