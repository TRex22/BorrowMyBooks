var pkg = require('../package');

module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        res.render('login.ejs', { 'title': pkg.name, 'buildVersion': pkg.version });
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { 'title': pkg.name, 'buildVersion': pkg.version });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
};
