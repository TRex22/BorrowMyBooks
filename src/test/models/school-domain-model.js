var fs = require('fs');
var http = require('http');
var util = require('util');
var validator = require('validator');
var should = require('chai').should();

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')
var validator = require('validator');
var config = require('../../config');

var mongoose = require('mongoose');

//models
var schoolDomain = require('../../models/schoolDomain');

var clear = require('../../db/clearDb');


/*js to test*/

//setup
chai.use(chaiHttp);

describe('#School Domain Schema', function() {
    beforeEach(function() {
        /*clear.go();*/
        var seed = require('../../db/seedDb');
        this.timeout(3000);
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