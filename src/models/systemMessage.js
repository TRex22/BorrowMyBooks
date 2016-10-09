var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var systemMessageSchema = mongoose.Schema({
        message: String,
        priority: Number,
        date: Date,
        adminId: String
}, { strict: false, collection: 'SystemMessage' });

systemMessageSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('SystemMessage', systemMessageSchema);
var systemMessage = mongoose.model('SystemMessage');

module.exports = systemMessage;