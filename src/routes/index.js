/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

module.exports = function(app, passport, site) {
    app.get('/', function(req, res) {
        res.render('index', { site: site });
    });
};
