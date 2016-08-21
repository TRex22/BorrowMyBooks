var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();

var app = require('../app');
var www = require('../bin/www-test');
/*js to test*/

//setup
chai.use(chaiHttp);

describe('#Home Route', function() {
    it('should respond to GET', function() {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
            });
    });

    it('should respond to POST with bad request', function() {
        chai.request(app)
            .post('/')
            .end(function(err, res) {
                res.should.have.status(404);
            });
    });
});

describe('#Login Route', function() {
    it('should respond to GET', function() {
        chai.request(app)
            .get('/login')
            .end(function(err, res) {
                res.should.have.status(200);
            });
    });
});

describe('#Signup Route', function() {
    it('should respond to GET', function() {
        chai.request(app)
            .get('/signup')
            .end(function(err, res) {
                res.should.have.status(200);
            });
    });
});

describe('#Explore Route', function() {
    it('should respond to GET', function() {
        chai.request(app)
            .get('/explore')
            .end(function(err, res) {
                res.should.have.status(200);
            });
    });
});

describe('#Admin Route', function() {
    it('should respond to GET', function() {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                res.should.have.status(200);
            });
    });
});

describe('#Service Routes', function() {
    it('should respond to GET (Not Found)', function() {
        chai.request(app)
            .get('/randomlol')
            .end(function(err, res) {
                res.should.have.status(404);
            });
    });

    it('should respond to GET (Unauthorised)', function() {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                res.should.have.status(401);
            });
    });

    it('should respond to GET (teapot)', function() {
        chai.request(app)
            .get('/teapot')
            .end(function(err, res) {
                res.should.have.status(418);
                res.body.should.equal('I want to be a teapot');
            });
    });
});
