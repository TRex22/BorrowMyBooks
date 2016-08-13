var mongoose = require('../config/db.js').mongoose;

var systemMessageSchema = mongoose.Schema({
    systemMessage: {
        Message: String,
        Priority: Number,
        Date: Date,
        AdminId: String
    }
});

mongoose.model('SystemMessage', systemMessageSchema);
var systemMessage = mongoose.model('SystemMessage');

module.exports = 
{
    systemMessage: systemMessage
}  