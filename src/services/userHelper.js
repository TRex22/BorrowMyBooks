function initUser(req) {
    if (!req.session.user) {
        req.session.user = {};
        req.session.user.isAdmin = false;
        req.session.user.isLoggedIn = false;        
    }

    if(!req.user){
        req.user = {};
        req.user.isAdmin = false;
        req.user.isLoggedIn = false;
    }

    return req;
}

function processUser(req, logout) {
    if (!req.user) {
        req = initUser(req);
    } else {
        req.session.user.isAdmin = isAdmin(req.session.user);
        req.session.user.isLoggedIn = true;
        req.user.isAdmin = isAdmin(req.user);
        req.user.isLoggedIn = true;
    }

    if (logout) {
        req.session.user = resetUser();
        req.user = resetUser();
    }

    return req;
}

function isAdmin(user) {
    if (user && user.userRole) return user.userRole.indexOf('admin') > -1;
    return false;
}

function resetUser() {
    user = {};
    user.isAdmin = false; //security
    user.isLoggedIn = false;

    return user;
}

module.exports = {
    isAdmin: isAdmin,
    processUser: processUser
}
