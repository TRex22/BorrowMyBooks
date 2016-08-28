function isAdmin(user) {
    if (user && user.userRole) return user.userRole.indexOf('admin') > -1;
    return false;
}

function resetUser(user) {
	user = {};
    user.isAdmin = false; //security
    user.isLoggedIn = false;

    return user;
}

module.exports = {
    isAdmin: isAdmin,
    resetUser: resetUser
}
