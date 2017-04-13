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
            .get('/login')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should login sucessfully', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                done();
            });
    });

    it('should login unsucessfully', function(done) {
        chai.request(app)
            .post('/login')
            .send({ username: 'Admin', password: 'sdggh' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login');
                done();
            });
    });

    it('should logout', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                request(app)
                    .get('/logout')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(302);
                        res.redirects.should.be.empty; //redirect
                        res.res.client._httpMessage.path.should.be.equal('/logout');
                        done();
                    });
            });
    });

    it('should logout with post', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                request(app)
                    .post('/logout')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(302);
                        res.redirects.should.be.empty; //redirect
                        res.res.client._httpMessage.path.should.be.equal('/logout');
                        done();
                    });
            });
    });
});