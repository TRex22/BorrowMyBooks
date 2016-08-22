var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');
var systemDefaultsSchema = mongoose.Schema({
    DefaultProfilePictureURL: String,
    DefaultBookPictureURL: String,
    DefaultTheme: String
}, { strict: false, collection: 'SystemDefaults' });

systemDefaultsSchema.methods.generateUUID = function() {
    return uuid.v4();
};

mongoose.model('SystemDefaults', systemDefaultsSchema);
var systemDefaults = mongoose.model('SystemDefaults');

module.exports = systemDefaults;
