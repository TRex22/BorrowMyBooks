var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../../config');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')
var validator = require('validator');

var app = require('../../app');
var www = require('../../bin/www-test');

var mongoose = require('../../config/db.js').mongoose;
var systemDefaults = require('../../models/systemDefaults');
var sysDefault = mongoose.model('SystemDefaults', systemDefaults);
var book = require('../../models/book');
var Book = mongoose.model('Book', book);
var User = mongoose.model('User', require('../../models/user'));

var clear = require('../../db/clearDb');


/*js to test*/

//setup
chai.use(chaiHttp);

describe('#Admin Route', function() {
    beforeEach(function() {
        /*clear.go();*/
        var seed = require('../../db/seedDb');
        this.timeout(3000);
    });


    it('should respond to GET (Not Found)', function(done) {
        chai.request(app)
            .get('/randomlol')
            .end(function(err, res) {
                res.should.have.status(404);
                done();
            });
    });

    it('should respond to GET (Unauthorised)', function(done) {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                res.redirects[0].should.include('/login');
                res.should.have.status(200);
                done();
            });
    });

    it('should respond to GET (teapot)', function(done) {
        chai.request(app)
            .get('/teapot')
            .end(function(err, res) {
                res.should.have.status(418);
                res.text.should.equal("I want to be a teapot");
                done();
            });
    });
});
