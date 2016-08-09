var mongoose = require('mongoose');

var interestSchema = mongoose.Schema({
    interest: {
        InterestId: String,
        InterestName: String,
        InterestDescription: String
    }
});

module.exports = mongoose.model('Interest', interestSchema);
