var mongoose = require('mongoose');
var logger = require("../logger/logger");
var config = require("../config.json");

var user = require('../models/user');
var book = require('../models/book');
var interest = require('../models/interest');
var transaction = require('../models/transaction');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');
var userRating = require('../models/userRating');

function go() {
    //check dev environment
    user.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    book.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    interest.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    transaction.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    systemMessage.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    userMessage.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    systemDefaults.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});

    userRole.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});	

    userRating.post('init', function(doc) {
	  logger.info('%s has been initialized from the db', doc._id);
	});
}
module.exports = {go:go};