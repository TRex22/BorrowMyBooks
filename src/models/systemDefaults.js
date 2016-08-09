var mongoose = require('mongoose');

var systemDefaultsSchema = mongoose.Schema({
    systemDefaults: {
        DefaultProfilePictureURL: String,
        DefaultBookPictureURL: String
    }
});

module.exports = mongoose.model('SystemDefaults', systemDefaultsSchema);
