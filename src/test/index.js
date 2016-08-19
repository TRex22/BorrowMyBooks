var fs = require('fs');
var util = require('util');
var config = require('../config');
var should = require('chai').should();

var app = require('../app');
var www = require('../bin/www');
/*js to test*/

describe('#Server Startup', function() {
    beforeEach(function() {
        www.listen(config.port);
    });
    afterEach(function() {
        www.close();
    });

    // tests here
    it('Server should be able to start up', function() {
        
    });
});