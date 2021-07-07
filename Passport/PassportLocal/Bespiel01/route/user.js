// File: user.js

const express = require("express");

const router = express.Router();

const newUser = require("../models/User");

router.post("login", (request, response, next) => {
    User = new User({username: request.body.username,
                    email: request.body.email});

    User.register(newUser, request.body.password, (err, user) => {
        if (err) {
            respond.json({success: false, message: "Konto konnte nicht angelegt werden.", err})
        } else {
            respond.json({success: true, message: "Konto wurde angelegt."})
        }
    })

});

userController.doLogin = (request, request) => {
    if (!request.body.username) {
        respond.json({success: false, message: "Wo ist der Username?"})
    } else if (!request.body.password) {
        respond.json({success: false, message: "Wo ist das Passwort?"})
    } else {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                respond.json({success: false, message: err})
            } else {
                if(!user) {
                    respond.json({success: false, message: "Benutzername oder Kennwort stimmt nicht"})
                } else {
                    // Login-Aufruf
                    request.login(user, (err)=> {
                        if (err) {
                            respond.json({success: false, message: err})
                        } else {
                            respond.json({success: true, message: "Anmeldung war offenbar erfolgreich."})
                        }
                    })
                }
            }
        })
    }

}
