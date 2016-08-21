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

var util = require('util');

/*console.log('Output: ' + util.inspect(book.schema.methods.generateUUID));*/
console.log(book.schema.methods.generateUUID());

var testPassword = "hello123";

console.log(user.schema.methods.generateHash(testPassword));