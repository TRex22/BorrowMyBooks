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
var schoolDomain = require('../models/schoolDomain');

var seed = require('../db/seedDb');
var clear = require('../db/clearDb');

describe('#School Domain Schema', function() {
    beforeEach(function() {
        clear.go();
        seed.go();
    });

    // tests here
    it('should be able to determine that an email is a student', function() {
        var email = "student@wits.ac.za";
        var SchoolDomain = mongoose.model('SchoolDomain', schoolDomain);

        schoolDomain.findOne({}, function(err, domainObj) {
            domainObj.isStudentEmail(email).should.be.true;
        });
    });

    it('should be able to determine that an email is not a student', function() {
        var email = "student@yahoo.com";
        var SchoolDomain = mongoose.model('SchoolDomain', schoolDomain);

        schoolDomain.findOne({}, function(err, domainObj) {
            domainObj.isStudentEmail(email).should.be.false;
        });
    });
});

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
