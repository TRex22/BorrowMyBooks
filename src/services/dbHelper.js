'use strict'
var logger = require("../logger/logger");

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
/* istanbul ignore  next*/
/*function listUsers() {
    var User = mongoose.model('User', user);
    return User.find({}, function(err, data) {});
}*/

function listBooks(callback) {
    var Book = mongoose.model('Book', book);
    Book.find({}, function(err, books) {
    	callback.data.err = err;
        books.toArray(callback.data.books);
    });
}

function getSystemDefaults(callback) {
    var sysDefault = mongoose.model('SystemDefaults', systemDefaults);

    sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
    	callback.data.err = err;
    	callback.data.defaults = defaults;
        return defaults;
    });
}

function find(collec, query, callback) {
    mongoose.connection.db.collection(collec, function(err, collection) {
    	callback.collec.data.err = err;
        collection.find(query).toArray(callback.collec.data);
    });
}

function dropCollection(collec) {
    mongoose.connection.collections[collec].drop(function(err) {
        logger.warn("collection " + collec + "dropped");
    });
}

module.exports = {
    find: find,
    dropCollection: dropCollection,
    listBooks: listBooks,
    getSystemDefaults: getSystemDefaults
};
