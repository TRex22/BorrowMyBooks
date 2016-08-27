'use strict'

var logger = require("./logger/logger");

//This is a db reset script
var clear = require('./db/clearDb');
var seed = require('./db/seedDb');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

(async (function restoreDb(){
	await (	logger.warn("clearDb"), clear.go(), logger.warn("\nseedDb"), seed.go());
	
}))();
/*process.exit();*/

//todo Fix