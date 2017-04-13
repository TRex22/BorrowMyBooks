'use strict'

//test function to test some system features as they arise

var user = require('./models/user');
var book = require('./models/book');
var interest = require('./models/interest');
var transaction = require('./models/transaction');
var systemMessage = require('./models/systemMessage');
var userMessage = require('./models/userMessage');
var systemDefaults = require('./models/systemDefaults');
var userRole = require('./models/userRole');
var userRating = require('./models/userRating');

var dbHelper = require('./services/dbHelper');
var mongoose = require('./config/db.js').mongoose;

var util = require('util');
var async = require("async");

var wrap = require('co-express');
var co = require('co');

var bookHelper = require('./services/bookHelper');



var clearDb = require('./db/clearDb').go();
//wait 2 seconds
console.log("Please wait 2 seconds.")
setTimeout(function() {
    var seed = require('./db/seedDb');
}, 2000);

