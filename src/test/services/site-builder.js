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