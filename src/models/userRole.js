var mongoose = require('../config/db.js').mongoose;

var userRoleSchema = mongoose.Schema({
    userRole: {
    	RoleId: String,
    	RoleName: String,
    	RoleDescription: String
    }
}, { strict: false, collection: 'UserRole' });

mongoose.model('UserRole', userRoleSchema);
var userRole = mongoose.model('UserRole');

module.exports = userRole;