var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect();

var app = require('../app');
var www = require('../bin/www-test');
/*js to test*/

//setup
chai.use(chaiHttp);

describe('#Home Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                err.should.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to POST with bad request', function(done) {
        chai.request(app)
            .post('/')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(404);
                done();
            });
    });
});

describe('#Login Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/login')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(200);
                done();
            });
    });
});

describe('#Signup Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/signup')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(200);
                done();
            });
    });
});

describe('#Explore Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/explore')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(200);
                done();
            });
    });
});

describe('#Admin Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(200);
                done();
            });
    });
});

describe('#Service Routes', function() {
    it('should respond to GET (Not Found)', function(done) {
        chai.request(app)
            .get('/randomlol')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(404);
                done();
            });
    });

    it('should respond to GET (Unauthorised)', function(done) {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(401);
                done();
            });
    });

    it('should respond to GET (teapot)', function(done) {
        chai.request(app)
            .get('/teapot')
            .end(function(err, res) {
                err.should.be.null;
                res.should.have.status(418);
                res.body.should.equal('I want to be a teapot');
                done();
            });
    });
});
