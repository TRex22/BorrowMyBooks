var mongoose = require('mongoose');

var userMessageSchema = mongoose.Schema({
    userMessage: {
    	Message: String,
    	Priority: Number,
    	Date: String,
    	AdminId: String,
    	FromUserId: String,
    	ToUserId: String,
    	BookId: String,
    	TransactionId: String
    }
});

module.exports = mongoose.model('UserMessage', userMessageSchema);
