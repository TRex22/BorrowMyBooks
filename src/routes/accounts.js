var pkg = require('../package');
var config = require('../config');

var mongoose = require('../config/db.js').mongoose;
var systemDefaults = require('../models/systemDefaults');
sysDefault = mongoose.model('SystemDefaults', systemDefaults);

module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        var site = {};
        site.buildVersion = pkg.version;

        sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
            site.defaults = defaults;

            res.render('login.ejs', { 'title': pkg.name, 'site': site });
        });
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function(req, res) {
        var site = {};
        site.buildVersion = pkg.version;

        sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
            site.defaults = defaults;

            res.render('signup.ejs', { 'title': pkg.name, 'site': site });
        });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
};
