var mongoose = require('../config/db.js').mongoose;

var userRatingSchema = mongoose.Schema({
    userRating: {
        userId: String,
        Date: Date,
        TransactionId: String,
        Rating: Number,
        RaterId: String
    }
});

mongoose.model('UserRating', userRatingSchema);
var userRating = mongoose.model('UserRating');

module.exports = 
{
    userRating: userRating
}  