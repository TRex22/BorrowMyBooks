var fs = require('fs');
var http = require('http');
var util = require('util');
var validator = require('validator');
var should = require('chai').should();

var config = require('../../config');

var mongoose = require('mongoose');

//models
var user = require('../../models/user');

describe('#User Schema', function() {
    // tests here
    it('should be able to generate a valid UUID', function() {
        var testStr = user.schema.methods.generateUUID();
        validator.isUUID(testStr).should.be.true;
    });

    it('should be able to generate a hashed and salted password and compare with original password (correct password)', function() {
        var testPassword = "hello123"; //a bad password

        var iUser = new user({
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
            lastLoginDate: new Date(),
            registrationDate: new Date()
        });

        iUser.userId = iUser.generateUUID();
        iUser.salt = iUser.generateSalt();
        iUser.hash = iUser.generateHash(testPassword);

        iUser.hash.should.not.equal(testPassword);
        iUser.verifyPassword(testPassword).should.be.true;

    });

    it('should be able to generate a hashed and salted password and compare with original password (wrong password)', function() {
        var testPassword = "hello123"; //a bad password

        var iUser = new user({
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
            lastLoginDate: new Date(),
            registrationDate: new Date()
        });

        iUser.userId = iUser.generateUUID();
        iUser.salt = iUser.generateSalt();
        iUser.hash = iUser.generateHash(testPassword);

        iUser.hash.should.not.equal(testPassword);
        testPassword = "wrong password";
        iUser.verifyPassword(testPassword).should.be.false;
    });

    it('should be able to check for admin role (is admin)', function() {
        var testPassword = "hello123"; //a bad password

        var iUser = new user({
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
            lastLoginDate: new Date(),
            registrationDate: new Date()
        });

        iUser.userId = iUser.generateUUID();
        iUser.salt = iUser.generateSalt();
        iUser.hash = iUser.generateHash(testPassword);

        iUser.checkAdminRole().should.be.true;
    });

    it('should be able to check for admin role (is not a admin)', function() {
        var testPassword = "hello123"; //a bad password

        var iUser = new user({
            username: "Admin",
            email: "contact@jasonchalom.com",
            salt: null,
            hash: null,
            name: "Administrator",
            address: "Room 13",
            phone: "1234567890",
            interests: [],
            picUrl: null,
            userRole: ["owner"],
            lastLoginDate: new Date(),
            registrationDate: new Date()
        });

        iUser.userId = iUser.generateUUID();
        iUser.salt = iUser.generateSalt();
        iUser.hash = iUser.generateHash(testPassword);

        iUser.checkAdminRole().should.be.false;
    });
});
