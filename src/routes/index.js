/* jshint node: true */
var express = require('express');
var pkg = require('../package');
var router = express.Router();

var mongoose = require('../config/db.js').mongoose;
var systemDefaults = require('../models/systemDefaults');

/* GET home page. */
router.get('/', function(req, res, next) {
    var site = {};
    site.buildVersion = pkg.version;

    sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
        site.defaults = defaults;

        res.render('index', { title: 'Borrow My Books', site: site });
    });
});

module.exports = router;
