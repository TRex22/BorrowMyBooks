'use strict'

var logger = require("./logger/logger");

//This is a db reset script
var clear = require('./db/clearDb');
var seed = require('./db/seedDb');

var async = require('async');

async.waterfall([
    clear.go(),
    seed.go()
], function(error, success) {
    if (error) { logger.err('Something is wrong!'); }
    logger.info("db reinitialised.");
});
/*process.exit();*/

//todo Fix
