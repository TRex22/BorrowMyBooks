var fs = require('fs');
var http = require('http');
var util = require('util');
var validator = require('validator');
var should = require('chai').should();

var config = require('../../config');

var mongoose = require('mongoose');

var seed = require('../../db/seedDb');
var clear = require('../../db/clearDb');

//models
var schoolDomain = require('../../models/schoolDomain');

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