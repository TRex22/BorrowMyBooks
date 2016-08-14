var mongoose = require('../config/db.js').mongoose;

var interestSchema = mongoose.Schema({
    interest: {
        InterestId: String,
        InterestName: String,
        InterestDescription: String
    }
}, { strict: false, collection: 'Interest' });

mongoose.model('Interest', interestSchema);
var interest = mongoose.model('Interest');

module.exports = interest;