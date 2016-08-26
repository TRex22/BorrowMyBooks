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
    site.buildVersion = pkg.version;
    site.defaults = {};
    site.defaults.DefaultTheme = config.defaultTheme;
    site.defaults.Title = config.title;
    site.defaults.DefaultProfilePictureURL = config.defaultProfilePictureURL;
    site.defaults.DefaultBookPictureURL = config.defaultBookPictureURL;

    return site;
}

function updateSite(site){
    logger.info("Updating site backpack from db.");
/*    var systemDefaults = yield(sysDefault.findOne({}, function(err, defaults) {
        return defaults; }));
    console.log("sysdef: " + util.inspect(systemDefaults));*/

    if (systemDefaults !== null) {
        /*site.defaults = systemDefaults;*/
        /*
                sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
                    callback.data.err = err;
                    callback.data.defaults = defaults;
                    return defaults;
                });
        */


    }

    return site;
}

module.exports = { 
    initSite: initSite,
    updateSite: updateSite
};
