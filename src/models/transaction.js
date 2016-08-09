var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    transaction: {
        TransactionId: String,
        FromUserId: String,
        ToUserId: String,
        Amount: Number,
        isPurchase: Boolean,
        hasBeenRevoked: Boolean,
        Date: String,
        AdminId: String
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
