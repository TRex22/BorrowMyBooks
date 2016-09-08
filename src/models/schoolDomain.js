var mongoose = require('../config/db.js').mongoose;

var schoolDomainSchema = mongoose.Schema({
    date: Date,
    category: String,
    domains: [String]
}, { strict: false, collection: 'SchoolDomain' });

schoolDomainSchema.methods.isStudentEmail = function(email) {
    var domain = email.replace(/.*@/, ""); //todo: jmc fix for multiple @'s
    /* istanbul ignore next */
    if (this.domains.indexOf(domain) > -1) {
        return true; //TODO use email confirmation
    }
    return false;
};

var schoolDomain = mongoose.model('SchoolDomain', schoolDomainSchema);

module.exports = schoolDomain;
