var mongoose = require('../config/db.js').mongoose;

var userMessageSchema = mongoose.Schema({
    userMessage: {
    	Message: String,
    	Priority: Number,
    	Date: Date,
    	AdminId: String,
    	FromUserId: String,
    	ToUserId: String,
    	BookId: String,
    	TransactionId: String
    }
});

mongoose.model('UserMessage', userMessageSchema);
var userMessage = mongoose.model('UserMessage');

module.exports = 
{
    userMessage: userMessage
}  