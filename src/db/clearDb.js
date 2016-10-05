'use strict'
//use with caution!!!!
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

var dbHelper = require('../services/dbHelper.js');

function go() {
    dbHelper.dropCollection("SchoolDomain");
    dbHelper.dropCollection("User");
    dbHelper.dropCollection("Book");
    dbHelper.dropCollection("SystemDefaults");
    dbHelper.dropCollection("Transaction");
    dbHelper.dropCollection("UserMessage");
    dbHelper.dropCollection("UserRating");
    dbHelper.dropCollection("UserRole");
}

module.exports = { go: go };
