var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var should = require('chai').should();

var userHelper = require('../services/userHelper');

describe('#User Helper', function() {
    // tests here
    it('should determine a user is not an admin', function() {
        var iUser = {
            username: "Admin",
            email: "contact@jasonchalom.com",
            salt: null,
            hash: null,
            name: "Administrator",
            address: "Room 13",
            phone: "1234567890",
            interests: [],
            picUrl: null,
            userRole: ["user"],
            lastLoginDate: null,
            registrationDate: new Date()
        };

        userHelper.isAdmin(iUser).should.not.be.true;
    });

    it('should determine a user is not an admin', function() {
        var iUser = null;

        userHelper.isAdmin(iUser).should.not.be.true;
    });

    it('should determine a user is not an admin', function() {
        var iUser = {};

        userHelper.isAdmin(iUser).should.not.be.true;
    });

    it('should determine a user is an admin', function() {
        var iUser = {
            username: "Admin",
            email: "contact@jasonchalom.com",
            salt: null,
            hash: null,
            name: "Administrator",
            address: "Room 13",
            phone: "1234567890",
            interests: [],
            picUrl: null,
            userRole: ["admin"],
            lastLoginDate: null,
            registrationDate: new Date()
        };

        userHelper.isAdmin(iUser).should.be.true;
    });
});
