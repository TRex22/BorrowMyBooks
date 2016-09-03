var mongoose = require('../config/db.js').mongoose;

var schoolDomainSchema = mongoose.Schema({
    date: Date,
    category: String,
    domains: [String]
}, { strict: false, collection: 'SchoolDomain' });

var schoolDomain = mongoose.model('SchoolDomain', schoolDomainSchema);

module.exports = schoolDomain;
