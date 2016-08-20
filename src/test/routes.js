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

chai.use(chaiHttp);

describe('#Routes', function() {
    it('homepage should respond to GET', function() {
        chai.request(app)
        .get('/')
        .end(function(err, res){
            res.should.have.status(200);
        });
    });

    it('login should respond to GET', function() {
        chai.request(app)
        .get('/login')
        .end(function(err, res){
            res.should.have.status(200);
        });
    });

    it('signup should respond to GET', function() {
        chai.request(app)
        .get('/signup')
        .end(function(err, res){
            res.should.have.status(200);
        });
    });

    it('explore should respond to GET', function() {
        chai.request(app)
        .get('/explore')
        .end(function(err, res){
            res.should.have.status(200);
        });
    });

    it('admin should respond to GET', function() {
        chai.request(app)
        .get('/admin')
        .end(function(err, res){
            res.should.have.status(200);
        });
    });
});
