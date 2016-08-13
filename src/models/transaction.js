var mongoose = require('../config/db.js').mongoose;

var transactionSchema = mongoose.Schema({
    transaction: {
        TransactionId: String,
        FromUserId: String,
        ToUserId: String,
        Amount: Number,
        isPurchase: Boolean,
        hasBeenRevoked: Boolean,
        Date: Date,
        AdminId: String
    }
});

mongoose.model('Transaction', transactionSchema);
var transaction = mongoose.model('Transaction');

module.exports = 
{
    transaction: transaction
}  