var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../config');
var pkg = require('../package.json');
var should = require('chai').should();
var validator = require('validator');

var userHelper = require('../services/userHelper');
var siteBuilder = require('../services/siteBuilder');

var app = require('../app');

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

describe('#SiteBuilder', function() {
    // tests here
    it('should init site object', function() {
        var site = siteBuilder.initSite();

        site.user.isAdmin.should.be.false; //security
        site.buildVersion.should.equal(pkg.version);

        site.defaults.DefaultTheme.should.equal(config.defaultTheme);
        site.defaults.Title.should.equal(config.title);
        site.defaults.DefaultProfilePictureURL.should.equal(config.defaultProfilePictureURL);
        site.defaults.DefaultBookPictureURL.should.equal(config.defaultBookPictureURL);
        site.defaults.DefaultBrandingText.should.equal(config.defaultBrandingText);
    });


    it('should get defaults from db', function() {
        var site = siteBuilder.updateSite(app);
/*
        site.user.isAdmin.should.be.false; //security
        site.buildVersion.should.equal(pkg.version);

        validator.isAscii(site.defaults.DefaultTheme).should.be.true;

        site.defaults.Title.should.be(config.title);

        validator.isURL(site.defaults.DefaultProfilePictureURL).should.be.true;
        validator.isURL(site.defaults.DefaultBookPictureURL).should.be.true;

        site.defaults.DefaultBrandingText.should.be(config.defaultBrandingText);*/
    });
});
