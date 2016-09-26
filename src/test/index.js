var fs = require('fs');
var util = require('util');
var config = require('../config');
var should = require('chai').should();

var app = require('../app');
var www = require('../bin/www-test');

var seed = require('../db/seedDb');

/*js to test*/

//make sure things startup
describe('#Server Startup', function() {
    beforeEach(function*() {
        www.listen(config.port + 1); //use a different port
        var sd = yield seed.go();
    });

    afterEach(function() {
        www.close();
    });
    
    // tests here
    it('Server should be able to start up', function() {
        console.log("    started?");
    });
});
