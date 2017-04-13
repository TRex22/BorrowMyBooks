var fs = require('fs');
var util = require('util');
var config = require('../config');
var should = require('chai').should();

var app = require('../app');
var www = require('../bin/www-test');

/*js to test*/

//make sure things startup
describe('#Server Startup', function() {
    beforeEach(function() {
        www.listen(config.port + 1); //use a different port
        require('../db/clearDb').go();
        require('../db/seedDb');
    });

    afterEach(function() {
        www.close();
    });
    
    // tests here
    it('Server should be able to start up', function() {
        console.log("    started?");
    });
});
