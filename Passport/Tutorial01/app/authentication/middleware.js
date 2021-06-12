// file: middleware.js

function authenticationMiddleware() {
    return function (request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        }
        response.redirect("/");
    }
}