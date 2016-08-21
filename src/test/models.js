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

describe('#Book Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = book.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#Interest Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = interest.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#Transaction Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = transaction.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#SystemMessage Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = systemMessage.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserMessage Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = userMessage.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#SystemDefaults Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = systemDefaults.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserRole Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = userRole.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});

describe('#UserRating Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = userRating.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});
