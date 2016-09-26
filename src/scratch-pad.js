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

var bookHelper = require('./services/bookHelper');

/*console.log('Output: ' + util.inspect(book.schema.methods.generateUUID));*/
/*console.log(book.schema.methods.generateUUID());

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
console.log(iUser.verifyPassword(testPassword));*/
/*
var user = new user({});
console.log('Output: ' + util.inspect(user.schema));*/
//require('./db/seedDb').go();

/*var result = dbHelper.find('User', { username: "Admin" }, function (err, docs){
    console.log(util.inspect(docs));
});*/

/*var mongoose = require('./config/db.js').mongoose;
console.log(util.inspect(mongoose.connection.db.collection));*/

/*var users = dbHelper.listUsers();
console.log(util.inspect(users));*/

/*async.waterfall([
    readFile,
    processFile
], function (error) {
    if (error) {
        //handle readFile error or processFile error here
    }
});*/

var clearDb = require('./db/clearDb').go();
var seedDb = require('./db/seedDb').go();

/*wrap(function*(){
    clearDb.go();
    yield seedDb.go();
});*/



/*bookHelper.getAmazonBookCover();*/