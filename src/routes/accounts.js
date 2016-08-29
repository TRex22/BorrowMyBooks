var pkg = require('../package');
var config = require('../config');

var userHelper = require('../services/userHelper');

module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        req = userHelper.processUser(req);
        res.render('accounts/login.ejs', { 'site': app.locals.site, user: req.user });
    });
    app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            req = userHelper.processUser(req);
            res.redirect(req.session.returnTo || '/');
        });

    app.get('/signup', function(req, res) {
        res.render('accounts/signup.ejs', { 'site': app.locals.site, user: req.user });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        req = userHelper.processUser(req, true);
        res.redirect('/');
    });
};
