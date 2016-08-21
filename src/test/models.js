var fs = require('fs');
var http = require('http');
var util = require('util');
var validator = require('validator');
var config = require('../config');
var should = require('chai').should();

var mongoose = require('mongoose');
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

describe('#User Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = user.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });

	it('shouble be able to generate a hashed and salted password and compare with original password', function() {
		var testPassword = "hello123"; //a bad password
		var hash = user.schema.methods.generateHash(testPassword);

		hash.should.not.equal(testPassword);

		var testUser = new user({
			username: "testUser",
	        userId: null,
	        email: "test@test.com",
	        salt: String,
	        hash: String,
	        name: String,
	        address: String,
	        phone: String,
	        interests: [String],
	        picUrl: String,
	        userRole: [String],
	        lastLoginDate: Date,
	        registrationDate: Date
		});
		user.schema.methods.verifyPassword(testPassword).should.be.true;

    });

    it('shouble be able to ', function() {

    });

    it('shouble be able to ', function() {

    });
});

describe('#Book Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = book.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#Interest Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = interest.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#Transaction Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = transaction.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#SystemMessage Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = systemMessage.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserMessage Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = userMessage.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#SystemDefaults Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = systemDefaults.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserRole Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = userRole.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserRating Schema', function() {
    // tests here
    it('shouble be able to generate a valid UUID', function() {
        var testStr = userRating.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});
