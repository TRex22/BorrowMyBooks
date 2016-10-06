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

    it('admin should respond to GET not logged in', function(done) {
        chai.request(app)
            .get('/admin')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });
    });

    it('admin should respond to GET logged in', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: 'Admin', password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                cookie.should.have.elements;
                request(app)
                    .get('/admin')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });
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
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                request(app)
                    .get('/admin/system-defaults')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });

            });
    });

    it('system-defaults should respond to POST not logged in', function(done) {
        request(app)
            .post('/admin/system-defaults')
            .send({ defaultTheme: "testtest" })
            .end(function(err, res) {
                res.should.have.status(302);
                done();
            });

    });

    it('system-defaults should respond to POST logged in', function(done) {
        this.timeout(3000);
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                request(app)
                    .post('/admin/system-defaults')
                    .send({ defaultTheme: "flatly" })
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect

                        sysDefault.findOne({}).exec(function(err, defaults) { //there should only be one set of defaults
                            if (err) done(err);

                            defaults.DefaultTheme.should.equal("flatly");
                            done();
                        });
                    });
            });
    });

    it('system-defaults should respond to GET', function(done) {
        chai.request(app)
            .get('/admin/system-information')
            .end(function(err, res) {
                res.should.have.status(200);
                res.redirects[0].should.contain('/login'); //redirect
                done();
            });

    });

    it('system-defaults should respond to GET logged in', function(done) {
        request(app)
            .post('/login?username=Admin&password=123456')
            .send({ username: "Admin", password: '123456' })
            .end(function(err, res) {
                res.should.have.status(302);
                var cookie = res.headers['set-cookie'];
                request(app)
                    .get('/admin/system-information')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });

            });
    });
});
