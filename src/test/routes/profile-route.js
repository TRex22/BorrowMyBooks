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


    it('should respond to GET not logged in', function(done) {
        chai.request(app)
            .get('/profile')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });
    });

    it('should respond to GET logged in', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                request(app)
                    .get('/profile')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });
            });
    });

    it('settings should respond to GET not logged in', function(done) {
        chai.request(app)
            .get('/profile/settings')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });
    });

    it('settings should respond to GET logged in', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                request(app)
                    .get('/profile/settings')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });
            });
    });

    it('settings should respond to POST not logged in', function(done) {
        chai.request(app)
            .post('/profile/settings')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });
    });

    it('settings should respond to POST logged in and update user details', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                User.findOne({ username: "Admin" }, function(err, user) {
                    request(app)
                        .post("/profile/settings?fullname=Test")
                        .set('cookie', cookie)
                        .send({ fullname: "Test" })
                        .end(function(err, res) {
                            res.should.have.status(302);
                            res.redirects.should.be.empty; //redirect
                            res.res.client._httpMessage.path.should.contain("/profile");

                            chai.request(app)
                                .get('/profile/settings')
                                .end(function(err, res) {
                                    User.findOne({ _id: user._id }, function(err, tuser) {
                                        res.should.have.status(200);
                                        tuser.name.should.be.equal("Test", "Administrator");
                                        done();
                                    });
                                });
                        });
                });
            });
    });
});
