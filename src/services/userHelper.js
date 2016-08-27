function isAdmin(user) {
    if (user && user.userRole) return user.userRole.indexOf('admin') > -1;
    return false;
}

module.exports = {
    isAdmin: isAdmin
}
