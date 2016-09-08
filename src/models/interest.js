var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var interestSchema = mongoose.Schema({
    InterestId: String,
    InterestName: String,
    InterestDescription: String
}, { strict: false, collection: 'Interest' });

interestSchema.methods.generateUUID = function() {
    return uuid.v4();
};

mongoose.model('Interest', interestSchema);
var interest = mongoose.model('Interest');

module.exports = interest;
