/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index', { site: app.locals.site });
    });
};
