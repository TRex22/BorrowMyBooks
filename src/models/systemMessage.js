var mongoose = require('mongoose');

var systemMessageSchema = mongoose.Schema({
    systemMessage: {
        Message: String,
        Priority: Number,
        Date: String,
        AdminId: String
    }
});

module.exports = mongoose.model('SystemMessage', systemMessageSchema);
