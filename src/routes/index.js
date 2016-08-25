/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

module.exports = function(app, passport, site) {
    router.get('/', function(req, res, next) {
        res.render('index', {site: site});
    });
};
