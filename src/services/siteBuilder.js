var dbHelper = require('./dbHelper');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var util = require('util');

var pkg = require('../package.json');
var config = require('../config.json');

var systemDefaults = async(function() {
    var mongoose = require('../config/db.js').mongoose;
    var sysDefault = mongoose.model('SystemDefaults', systemDefaults);

    var defs = null;
    await (sysDefault.findOne({}, function(err, defaults) { //there should only be one set of defaults
        /*callback.data.err = err;
        callback.data.defaults = defaults;*/
        defs = await (defaults);
    }));

    return defs;
});

function buildSite() {
    var site = {};
    site.buildVersion = pkg.version;
    site.defaults = {};
    site.defaults.DefaultTheme = config.defaultTheme;
    site.defaults.Title = config.title;
    site.defaults.DefaultProfilePictureURL = config.defaultProfilePictureURL;
    site.defaults.DefaultBookPictureURL = config.defaultBookPictureURL;

    if (systemDefaults !== null) {
        site.defaults = systemDefaults;
        console.log("sysdef: " + util.inspect(systemDefaults));
    }
    return site;
}

module.exports = {
    buildSite: buildSite
};
