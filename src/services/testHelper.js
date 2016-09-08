var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var expect = require('chai').expect;
var request = require('supertest')
var validator = require('validator');

var request = require('supertest');
var server = request.agent('http://localhost:' + config.port);

var app = require('../app');
var www = require('../bin/www-test');

/* istanbul ignore next */
function loginUser() {
    /*return function(done) {
        server
            .post('/login')
            .send({ username: 'Admin', password: '123456' })
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };*/

};

module.exports = {
    loginUser: loginUser
}
