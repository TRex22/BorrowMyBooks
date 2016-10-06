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
var seed = require('../../db/seedDb');

/*js to test*/

//setup
chai.use(chaiHttp);

describe('#Admin Route', function() {
    beforeEach(function() {
        clear.go();

        seed.go();
        seed.system();
        this.timeout(3000);
    });

    it('should respond to GET', function(done) {
        chai.request(app)
            .get('/explore')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('my books should respond to GET no logged in', function(done) {
        chai.request(app)
            .get('/explore/mine')
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
                    .get('/explore/mine')
                    .set('cookie', cookie)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.redirects.should.be.empty; //redirect
                        done();
                    });
            });
    });
});
