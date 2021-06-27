// file: standardController.js

const {body,validationResult } = require("express-validator");
const util = require("util");
const debuglog = util.debuglog("app");

// Login
exports.login_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling login get ***");
    response.render("login");
};

exports.login_post = (request, response, next) => {
    debuglog("*** Standard Controller - calling login post ***");
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: "Ungültiger Benutzername oder Passwort."
    });
};

// Register
exports.register_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling register get ***");
    response.render("register");
};

exports.register_post = (request, response, next) => {
    debuglog("*** Standard Controller - calling register post ***");

    // Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        password: request.body.password,
        }), request.body.password, (err, user) => {
            if (err) {
                debuglog("!!! Fehler in register-Route: " + err.message + "!!!");
                response.redirect("/register");
            } else {
                debuglog("*** Registration was good ***");
                passport.authenticate("local", (err,user,info) => {
                    debuglog("*** Inside the authenticate callback ***");
                    if (err) {
                        return next(err);
                    }
                    response.redirect("/login");
                })(request, response, next);
            }
        });
};

// Password Recover
exports.passwordRecover_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling Password recover  ***");
    response.render("passwordRecover", {});
};
