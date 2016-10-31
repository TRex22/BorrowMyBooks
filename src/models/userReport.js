var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userReportSchema = mongoose.Schema({
    	message: String,
        reason: [String],
    	priority: Number,
    	date: Date,
    	adminId: String,
    	reportingUserId: String,
    	userId: String,
    	bookId: String,
    	transactionId: String,
        reportClosed: Boolean
}, { strict: false, collection: 'UserReport' });

mongoose.model('UserReport', userReportSchema);
var userReport = mongoose.model('UserReport');

module.exports = userReport;