var mongoose = require('../config/db.js').mongoose;

var userRoleSchema = mongoose.Schema({
    userRole: {
    	RoleId: String,
    	RoleName: String,
    	RoleDescription: String
    }
});

mongoose.model('UserRole', userRoleSchema);
var userRole = mongoose.model('UserRole');

module.exports = 
{
    userRole: userRole
}  