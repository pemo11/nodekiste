// file: standardController.js

const {body,validationResult } = require("express-validator");
const util = require("util");
const debuglog = util.debuglog("app");
const User = require("../models/user");
const passport = require("passport");

// Login
exports.login_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling login get ***");
    response.render("login_form");
};

// Logout
exports.logout_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling logout get ***");
    // logout() wird von Passport angehängt
    request.logout();
    response.redirect("/");
};

// Habe ich selber gewusst, ohne Hilfe von Tante Google;)
// Offenbar funktioniert es
exports.login_post = [passport.authenticate("local", {
        successRedirect: "/catalog",
        failureRedirect: "/catalog/login",
        failureFlash: "Ungültiger Benutzername oder Passwort."
    }),
    (request, response, next) => {
        debuglog("*** Standard Controller - calling login post ***");
    }
];

// Register
exports.register_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling register get ***");
    response.render("register_form");
};

exports.register_post = (request, response, next) => {
    debuglog("*** Standard Controller - calling register post ***");

    // Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        email: request.body.email,
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
    debuglog("*** Standard Controller - calling Password recover get ***");
    response.render("passwordRecover", {});
};

exports.passwordRecover_post =  (request, response, next) => {
    debuglog("*** Standard Controller - calling Password recover post ***");
    response.send("*** Leider noch nicht umgesetzt ***");
};

exports.register_useraccount_get =  (request, response, next) => {
    debuglog("*** Standard Controller - calling Register User Account get ***");
    response.render("register_userAccount")
};

exports.register_useraccount_post =  (request, response, next) => {
    debuglog("*** Standard Controller - calling Register User Post Account ***");
    response.send("*** Leider noch nicht umgesetzt ***");
};
