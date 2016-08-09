var mongoose = require('mongoose');

var userRatingSchema = mongoose.Schema({
    userRating: {
        userId: String,
        Date: String,
        TransactionId: String,
        Rating: Number,
        RaterId: String
    }
});

module.exports = mongoose.model('UserRating', userRatingSchema);
