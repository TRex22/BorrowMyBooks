var mongoose = require('../config/db.js').mongoose;

var systemDefaultsSchema = mongoose.Schema({
    systemDefaults: {
        DefaultProfilePictureURL: String,
        DefaultBookPictureURL: String
    }
}, { strict: false, collection: 'SystemDefaults' });

mongoose.model('SystemDefaults', systemDefaultsSchema);
var systemDefaults = mongoose.model('SystemDefaults');

module.exports = systemDefaults;