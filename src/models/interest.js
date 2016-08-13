var mongoose = require('../config/db.js').mongoose;

var interestSchema = mongoose.Schema({
    interest: {
        InterestId: String,
        InterestName: String,
        InterestDescription: String
    }
});

mongoose.model('Interest', interestSchema);
var interest = mongoose.model('Interest');

module.exports = 
{
    interest: interest
}  