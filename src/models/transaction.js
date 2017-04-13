var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var transactionSchema = mongoose.Schema({
        transactionId: String,
        fromUserId: String,
        toUserId: String,
        bookId: String,
        amount: Number,
        amountToReturn: Number,
        cost: Number,
        isPurchase: Boolean,
        isRent: Boolean,
        hasBeenReturned: Boolean,
        returnDate: Date,
        hasBeenRevoked: Boolean,
        date: Date,
        adminId: String
}, { strict: false, collection: 'Transaction' });

transactionSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('Transaction', transactionSchema);
var transaction = mongoose.model('Transaction');

module.exports = transaction;