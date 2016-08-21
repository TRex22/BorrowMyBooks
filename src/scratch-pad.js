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

var testPassword = "hello123"; //a bad password

var iUser = new user({
    username: "Admin",
    email: "contact@jasonchalom.com",
    salt: null,
    hash: null,
    name: "Administrator",
    address: "Room 13",
    phone: "1234567890",
    interests: [],
    picUrl: null,
    userRole: ["admin"],
    lastLoginDate: new Date(),
    registrationDate: new Date()
});

iUser.userId = iUser.generateUUID();
iUser.salt = iUser.generateSalt();
iUser.hash = iUser.generateHash(testPassword);

console.log("hash: "+iUser.hash+" password: "+testPassword);
console.log(iUser.verifyPassword(testPassword));
