var fs = require('fs');
var http = require('http');
var util = require('util');
var config = require('../../config');
var pkg = require('../../package.json');
var should = require('chai').should();
var validator = require('validator');

var userHelper = require('../../services/userHelper');
var siteBuilder = require('../../services/siteBuilder');

var app = require('../../app');

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

    it('should create a new user', function() {
        var username = "testuser";
        var password = "08489785";
        var body = {};
        body.email = "test@example.com";
        body.name = "Test User";
        body.address = "14 Grimwald Place London";
        body.phone = "11223445656";
        body.interests = ["Computer Science"];

        var newUser = userHelper.createNewUser(username, password, body);

        newUser.username.should.be.equal(username);
        validator.isEmail(newUser.email).should.be.true;
        newUser.name.should.be.equal(body.name);
        newUser.address.should.be.equal(body.address);
        /*        validator.isMobilePhone(newUser.phone, 'en-ZA').should.be.true;*/
        newUser.phone.should.equal(body.phone);
        newUser.interests[0].should.be.equal(body.interests[0]);
        newUser.interests.length.should.be.equal(1);
        (newUser.picUrl === null).should.be.true;
        newUser.userRole.should.be.empty;
        validator.isDate("" + newUser.lastLoginDate).should.be.true;
        validator.isDate("" + newUser.registrationDate).should.be.true;
        validator.isUUID(newUser.userId).should.be.true;

        newUser.verifyPassword(password).should.be.true;
    });

    it('should auth a user successfully', function() {
        var req = {};
        var res = {};
        var site = {};

        var user = {
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

        req.user = user;

        userHelper.auth(req, res, site, false).should.be.true;
    });

    it('should auth a user unsuccessfully', function() {
        var req = {};        
        var res = {};

        //mock response redirect
        res.redirect = function(route) {
            res.test = route;
            res.status = 302;
            return route;
        };

        var site = {};

        userHelper.auth(req, res, site, false).should.be.false;
        res.test.should.be.equal('/login');
        res.status.should.be.equal(302);
    });

    it('should auth an admin user successfully', function() {
        var req = {};
        var res = {};
        var site = {};

        var user = {
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
        req.user = user;

        req.user.userRole = ['admin'];
        userHelper.auth(req, res, site, true).should.be.true;
    });

    it('should auth an admin user unsuccessfully', function() {
        var iUser = {
            username: "bloob",
            email: "contact@jasonchalom.com",
            salt: null,
            hash: null,
            name: "Administrator",
            address: "Room 13",
            phone: "1234567890",
            interests: [],
            picUrl: null,
            userRole: ["people"],
            lastLoginDate: null,
            registrationDate: new Date()
        };

        var req = {};
        var res = {};
        var site = {};
        req.session = {};
        req.session.user = iUser;
        site.test = "haha";
        req.user = iUser;
        req.url = 'errors/401.ejs';

        //mock response redirect
        res.test = {};
        res.status = function(code) {
            res.test.status = code;
            return code;
        };

        res.render = function(url, obj) {
            res.test.url = url;
            res.test.obj = {};
            res.test.obj = obj;
            return res.test;
        };

        userHelper.auth(req, res, site, true).should.be.false;
        res.test.status.should.be.equal(401);
        res.test.url.should.be.equal('errors/401.ejs');
        res.test.obj.title.should.be.equal('401: Unauthorized');
        res.test.obj.url.should.be.equal('errors/401.ejs');
        res.test.obj.statusCode.should.be.equal(401);
        res.test.obj.site.should.be.equal(site);
        res.test.obj.user.should.be.equal(req.user);
    });

});
