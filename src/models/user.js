var mongoose = require('../config/db.js').mongoose;
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var config = require('../config.json');

var userSchema = mongoose.Schema({
    user: {
        username: String,
        userId: String,
        email: String,
        salt: String,
        hash: String,
        name: String,
        address: String,
        phone: String,
        interests: [String],
        picUrl: String,
        userRole: [String],
        lastLoginDate: Date,
        registrationDate: Date
    }
}, { strict: false, collection: 'User' });

userSchema.methods.generateSalt = function() {
    return bcrypt.genSaltSync(config.security.saltLength);
};

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, this.salt, null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateUUID = function(){
    return uuid.v4();
};

userSchema.methods.checkAdminRole = function(){
    if (this.userRole.indexOf("admin") > -1)
    {
        return true;
    }
    return false;
};

mongoose.model('User', userSchema);
var user = mongoose.model('User');

module.exports = user;