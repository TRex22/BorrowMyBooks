var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userMessageSchema = mongoose.Schema({
    	message: String,
    	priority: Number,
    	date: Date,
    	adminId: String,
    	fromUserId: String,
    	toUserId: String,
    	bookId: String,
    	transactionId: String
}, { strict: false, collection: 'UserMessage' });


//Validated schema. Commented out because dont know how to pass to front-end.
/*var userMessageSchema = mongoose.Schema({
    	Message: {
            type: String,
            required: true
        },
    	Priority: Number,
    	Date: Date,
    	AdminId: String,
    	FromUserId: String,
    	ToUserId: String,
    	BookId: String,
    	TransactionId: String
}, { strict: false, collection: 'UserMessage' });*/

userMessageSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('UserMessage', userMessageSchema);
var userMessage = mongoose.model('UserMessage');

module.exports = userMessage;