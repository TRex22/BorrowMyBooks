var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var systemMessageSchema = mongoose.Schema({
    systemMessage: {
        Message: String,
        Priority: Number,
        Date: Date,
        AdminId: String
    }
}, { strict: false, collection: 'SystemMessage' });

systemMessageSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('SystemMessage', systemMessageSchema);
var systemMessage = mongoose.model('SystemMessage');

module.exports = systemMessage;