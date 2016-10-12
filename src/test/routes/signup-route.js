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


    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/signup')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

/*    it('should respond to POST and try to create a user already in the db', function(done) {
        chai.request(app)
            .post('/signup?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/signup');
                done();
            });
    });*/

    it('should respond to POST and try to create a new user but missing fields', function(done) {
        chai.request(app)
            .post('/signup?username=tty&password=123456')
            .send({ username: "tty", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(200);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                /*res.res.client._httpMessage.path.should.be.equal('/signup');*/
                done();
            });
    });

    it('should respond to POST and try to create a new user with sucess', function(done) {
        chai.request(app)
            .post('/signup?username=tty&password=123456')
            .send({ username: "tty", password: '123456', fullname: "Test Test", email: "jason@chalom.com", address: "1234 jhgsdjk", phone: "01111111111", interests: [] })
            .end(function(err, res) {
                res.should.have.status(200);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                /*res.res.client._httpMessage.path.should.be.equal('/');*/
                done();
            });
    });
});
