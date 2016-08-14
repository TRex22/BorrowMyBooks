var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userRatingSchema = mongoose.Schema({
    userRating: {
        userId: String,
        Date: Date,
        TransactionId: String,
        Rating: Number,
        RaterId: String
    }
}, { strict: false, collection: 'UserRating' });

userRatingSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('UserRating', userRatingSchema);
var userRating = mongoose.model('UserRating');

module.exports = userRating;