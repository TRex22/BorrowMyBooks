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

    it('should process a new user session', function() {
        var req = userHelper.processUser(req);
        req.user.isAdmin.should.be.false;
        req.user.isLoggedIn.should.be.false;
        req.session.user.isAdmin.should.be.false;
        req.session.user.isLoggedIn.should.be.false;
    });

    it('should process a new user session, where there is a req', function() {
        var req = {};
        req.session = {};
        req = userHelper.processUser(req);
        req.user.isAdmin.should.be.false;
        req.user.isLoggedIn.should.be.false;
        req.session.user.isAdmin.should.be.false;
        req.session.user.isLoggedIn.should.be.false;
    });

    it('should process a current user session', function() {
        var user = userHelper.resetUser();
        var req = {};
        req.session = {};
        req.session.user = user;
        req.user = user;

        req = userHelper.processUser(req);
        req.user.isAdmin.should.be.false;
        req.user.isLoggedIn.should.be.true;
        req.session.user.isAdmin.should.be.false;
        req.session.user.isLoggedIn.should.be.true;
    });

    it('should process a current admin user session', function() {
        var user = userHelper.resetUser();
        user.userRole = ['admin'];
        var req = {};
        req.session = {};
        req.session.user = user;
        req.user = user;

        req = userHelper.processUser(req);
        req.user.isAdmin.should.be.true;
        req.user.isLoggedIn.should.be.true;
        req.session.user.isAdmin.should.be.true;
        req.session.user.isLoggedIn.should.be.true;
    });

    it('should logout a user', function() {
        var user = userHelper.resetUser();
        user.userRole = ['admin'];
        var req = {};
        req.session = {};
        req.session.user = user;
        req.user = user;

        req = userHelper.processUser(req, true);
        (req.user.userRole === null).should.be.true;
        req.user.isAdmin.should.be.false;
        req.user.isLoggedIn.should.be.false;
        req.session.user.isAdmin.should.be.false;
        req.session.user.isLoggedIn.should.be.false;
    });

    it('should not logout a user', function() {
        var user = userHelper.resetUser();
        user.userRole = ['admin'];
        var req = {};
        req.session = {};
        req.session.user = user;
        req.user = user;

        req = userHelper.processUser(req, false);
        (req.user.userRole.indexOf('admin') > -1).should.be.true;
        req.user.isAdmin.should.be.true;
        req.user.isLoggedIn.should.be.true;
        req.session.user.isAdmin.should.be.true;
        req.session.user.isLoggedIn.should.be.true;
    });

    it('should reset a user', function() {
        var user = userHelper.resetUser();
        user.isAdmin.should.be.false;
        user.isLoggedIn.should.be.false;
    });

    it('should init a user', function() {
        var user = userHelper.resetUser();
        user.userRole = ['admin'];
        var req = {};
        req.session = {};
        req.user = user;
        req.session.user = user;

        var initUser = userHelper.initUser(req);
        initUser.user.isAdmin.should.be.false;
        initUser.user.isLoggedIn.should.be.false;
        initUser.session.user.isAdmin.should.be.false;
        initUser.session.user.isLoggedIn.should.be.false;
    });

    it('should init a user without a session', function() {
        var user = userHelper.resetUser();
        user.userRole = ['admin'];
        var req = {};
        req.session = {};
        req.user = user;

        var initUser = userHelper.initUser(req);
        initUser.user.isAdmin.should.be.false;
        initUser.user.isLoggedIn.should.be.false;
        initUser.session.user.isAdmin.should.be.false;
        initUser.session.user.isLoggedIn.should.be.false;
    });

    it('should init a user without req.user', function() {
        var req = {};
        req.session = {};

        var initUser = userHelper.initUser(req);
        initUser.user.isAdmin.should.be.false;
        initUser.user.isLoggedIn.should.be.false;
        initUser.session.user.isAdmin.should.be.false;
        initUser.session.user.isLoggedIn.should.be.false;
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


    it('should get defaults from db', function*() {
        var site = yield siteBuilder.updateSite(app);

        site.user.isAdmin.should.be.false; //security
        site.buildVersion.should.equal(pkg.version);

        validator.isAscii(site.defaults.DefaultTheme).should.be.true;

        site.defaults.Title.should.be(config.title);

        validator.isURL(site.defaults.DefaultProfilePictureURL).should.be.true;
        validator.isURL(site.defaults.DefaultBookPictureURL).should.be.true;

        site.defaults.DefaultBrandingText.should.be(config.defaultBrandingText);

        done();

    });

    it('should find theme in config themes array', function() {
        siteBuilder.findTheme('flatly').should.be.true;
    });

    it('should find theme in config themes array', function() {
        siteBuilder.findTheme('randomlol').should.be.false;
    });
});
