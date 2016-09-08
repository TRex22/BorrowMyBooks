var mongoose = require('../config/db.js').mongoose;
var uuid = require('uuid');

var userRoleSchema = mongoose.Schema({
    	RoleId: String,
    	RoleName: String,
    	RoleDescription: String
}, { strict: false, collection: 'UserRole' });

userRoleSchema.methods.generateUUID = function(){
    return uuid.v4();
};

mongoose.model('UserRole', userRoleSchema);
var userRole = mongoose.model('UserRole');

module.exports = userRole;