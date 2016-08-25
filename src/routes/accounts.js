var pkg = require('../package');
var config = require('../config');

module.exports = function(app, passport, site) {
    app.get('/login', function(req, res) {
        res.render('login.ejs', {'site': site });
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {'site': site });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
};
