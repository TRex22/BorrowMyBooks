var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var should = require('chai').should();

var app = require('../app');
var www = require('../bin/www');
/*js to test*/

describe('#homepage', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    it('should respond to GET', function() {
        http.get('http://localhost:' + config.port, function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(res).to.equal(200);
                done();
            });
        });
    });
});

describe('#login', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    it('should respond to GET', function() {
        http.get('http://localhost:' + config.port + '/login', function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(res).to.equal(200);
                done();
            });
        });
    });
});

describe('#signup', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    it('should respond to GET', function() {
        http.get('http://localhost:' + config.port + '/signup', function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(res).to.equal(200);
                done();
            });
        });
    });
});

describe('#explore', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    it('should respond to GET', function() {
        http.get('http://localhost:' + config.port + '/explore', function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(res).to.equal(200);
                done();
            });
        });
    });
});

describe('#admin', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    it('should respond to GET', function() {
        http.get('http://localhost:' + config.port + '/admin', function(res) {
            res.on('data', function(body) {
                console.log(body)
                expect(res).to.equal(200);
                done();
            });
        });
    });
});
