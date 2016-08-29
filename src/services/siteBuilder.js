var logger = require("../logger/logger");

var dbHelper = require('./dbHelper');
var mongoose = require('../config/db.js').mongoose;

var systemDefaults = require('../models/systemDefaults');
var sysDefault = mongoose.model('SystemDefaults', systemDefaults);

var util = require('util');

var pkg = require('../package.json');
var config = require('../config.json');

function initSite() {
    var site = {};
    site.user = {};
    site.user.isAdmin = false; //security
    site.user.isLoggedIn = false;
    site.buildVersion = pkg.version;
    site.defaults = {};
    site.defaults.DefaultTheme = config.defaultTheme;
    site.defaults.Title = config.title;
    site.defaults.DefaultProfilePictureURL = config.defaultProfilePictureURL;
    site.defaults.DefaultBookPictureURL = config.defaultBookPictureURL;
    site.defaults.DefaultBrandingText = config.defaultBrandingText;
    
    site.themes = config.themes;
    return site;
}

function updateSite(app) {
    logger.info("Updating site backpack from db ...");

    sysDefault.findOne({}).exec(function(err, defaults) { //there should only be one set of defaults
        if (err) throw err; //TODO: FIX

        if (defaults.DefaultTheme) {
            app.locals.site.defaults = defaults._doc;        
        }
        else{
            app.locals.site.defaults = initSite();
        }

        //make sure you cant break the site
        if (!findTheme(app.locals.site.defaults.DefaultTheme)){
            app.locals.site.defaults.DefaultTheme = config.defaultTheme;
        }
    });

    app.locals.site.buildVersion = pkg.version;
    logger.info("Done.");

    return app.locals.site;
}

function findTheme(theme){
    if (config.themes.indexOf(theme) > -1){
        return true;
    }
    return false;
}

module.exports = {
    initSite: initSite,
    updateSite: updateSite
};
/*
var site = siteBuilder.initSite();
site = siteBuilder.updateSite(site); //to make sure there is a site object even if db fails*/
