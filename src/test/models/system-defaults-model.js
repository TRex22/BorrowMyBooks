var fs = require('fs');
var http = require('http');
var util = require('util');
var validator = require('validator');
var should = require('chai').should();

var config = require('../../config');

var mongoose = require('mongoose');

//models
var systemDefaults = require('../../models/systemDefaults');

describe('#SystemDefaults Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = systemDefaults.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });
});