var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var transactionSchema = mongoose.Schema({
        TransactionId: String,
        FromUserId: String,
        ToUserId: String,
        Amount: Number,
        isPurchase: Boolean,
        hasBeenRevoked: Boolean,
        Date: Date,
        AdminId: String
}, { strict: false, collection: 'Transaction' });

transactionSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('Transaction', transactionSchema);
var transaction = mongoose.model('Transaction');

module.exports = transaction;