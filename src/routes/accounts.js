var pkg = require('../package');
var config = require('../config');

var userHelper = require('../services/userHelper');

module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        res.render('accounts/login.ejs', { 'site': app.locals.site });
    });
    app.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            app.locals.site.user = req.user;
            app.locals.site.user.isAdmin = userHelper.isAdmin(req.user);
            res.redirect(req.session.returnTo || '/');
        });

    app.get('/signup', function(req, res) {
        res.render('accounts/signup.ejs', { 'site': app.locals.site });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
};
