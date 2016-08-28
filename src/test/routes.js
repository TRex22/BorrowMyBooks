var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var validator = require('validator');

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
                res.should.have.status(200);
                done(err);
            });
    });

    it('should respond to POST with bad request', function(done) {
        chai.request(app)
            .post('/')
            .end(function(err, res) {
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
                res.should.have.status(200);
                done();
            });
    });

    it('should login sucessfully', function(done) {
        chai.request(app)
            .post('/login')
            .send({ username: 'Admin', password: '123456' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.not.contain('/login');
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
});

describe('#Signup Route', function() {
    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/signup')
            .end(function(err, res) {
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
                res.should.have.status(200);
                done();
            });
    });
});

describe('#Admin Route', function() {
    it('admin should respond to GET', function(done) {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('system-defaults should respond to GET', function(done) {
        chai.request(app)
            .get('/admin/system-defaults')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });
    });

    it('system-defaults should respond to GET logged in', function(done) {
        chai.request(app)
            .post('/login')
            .send({ username: 'Admin', password: '123456' })
            .then(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.not.contain('/login');
            })
            .get('/admin/system-defaults')
            .end(function(err, res) {
                res.should.have.status(200);
                console.log(res)
                done();
            });;


    });

    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/admin/system-defaults')
            .end(function(err, res) {
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
