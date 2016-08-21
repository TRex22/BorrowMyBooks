'use strict'

var mongoose = require('../config/db.js').mongoose;
var config = require('../config.json');
var async = require("async");

//models
var user = require('../models/user');
var book = require('../models/book');
var interest = require('../models/interest');
var transaction = require('../models/transaction');
var systemMessage = require('../models/systemMessage');
var userMessage = require('../models/userMessage');
var systemDefaults = require('../models/systemDefaults');
var userRole = require('../models/userRole');
var userRating = require('../models/userRating');

/*function listUsers() {
    var User = mongoose.model('User', user);
    return User.find({}, function(err, data) {});
}*/

/* istanbul ignore  next*/
/*function listBooks() {
    var User = mongoose.model('User', user);
    return User.find({}, function(err, data) {});
}*/

/* istanbul ignore  next*/
function find(collec, query, callback) {
    mongoose.connection.db.collection(collec, function(err, collection) {
        collection.find(query).toArray(callback);
    });
}

module.exports = {
    find: find
};
