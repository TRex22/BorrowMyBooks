var mongoose = require('mongoose');

var userRoleSchema = mongoose.Schema({
    userRole: {
    	RoleId: String,
    	RoleName: String,
    	RoleDescription: String
    }
});

module.exports = mongoose.model('UserRole', userRoleSchema);
