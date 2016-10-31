var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userLogSchema = mongoose.Schema({
    	log: String,
    	date: Date,
    	userId: String,
       	bookId: String,
    	transactionId: String,
        messageId: String
}, { strict: false, collection: 'UserLog' });

mongoose.model('UserLog', userLogSchema);
var userLog = mongoose.model('UserLog');

module.exports = userLog;