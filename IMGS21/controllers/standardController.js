// file: standardController.js

const {body,validationResult } = require("express-validator");
const util = require("util");
const debuglog = util.debuglog("app");
const User = require("../models/user");
const UserInfo = require("../models/userinfo");
const passport = require("passport/lib");
const path = require("path");
const { userInfo } = require("os");
const fs = require("fs");
const multer = require("multer");
const helpers = require("../helpers");

var express = require('express');
const { response } = require("express");
var router = express.Router();

 // Ein Zielverzeichnis anlegen
const imageDrop = multer.diskStorage({
    // Den Pfad des Zielverzeichnis angeben
    destination: path.join( __dirname , "../public/filedrop"),
      filename: (request, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});

// Die Upload-Aktion festlegen
const imageUpload = multer({
    storage: imageDrop,
    limits: {
      fileSize: 1000000 
    },
    fileFilter(request, file, cb) {
      if (file.originalname.match(/\.(png|jpg)$/) == null) { 
         // Es sollen nur png und jpg Dateien hoch geladen werden können
         return cb(new Error("Nur Bitmaps erlaubt!"))
       }
     cb(undefined, true)
  }
}) 

// Allgemeine Abfrage, ob eine Authentifizierung erfolgt ist
function isLoggedIn(request, response, next) {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/catalog/login");
}

// Login
exports.login_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] - Standard Controller - calling login get ***`);
    response.render("login_form");
};

// Logout
exports.logout_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] - Standard Controller - calling logout get ***`);
    // logout() wird von Passport angehängt
    request.logout();
    response.redirect("/");
};

// Habe ich selber gewusst, ohne Hilfe von Tante Google;)
// Offenbar funktioniert es
// Es funktioniert aber nicht mehr, wenn ich die LastLogin-Property des User-Objekts setzen will
// Es geht dann einfach nicht weiter, offenbar fehlt noch ein redirect?
// Also  neuer Versuch
/*
exports.login_post = [
        passport.authenticate("local", {
         successRedirect: "/catalog",
         failureRedirect: "/catalog/login",
         failureFlash: "Ungültiger Benutzername oder Passwort."
    }, (err, user) => {
        // lastLogin-Property für UserInfo soll aktualisiert werden
        // request ist aber undefined, die Daten stecken in Response (immerhin;)
        // An dieser Stelle geht es im Moment nicht weiter! - irgendetwas fehlt noch
        // Denkfehler - der zweite Parameter wird (natürlich) das user-Objekt sein, denn das ist der Callback
        var query = { "user": user.id };
        var update = { lastLogin: Date.toISOString() };
        var options = { new: true };
        UserInfo.findOneAndUpdate(query, update, options, (err, user) => {
            if (err) {
                debuglog(`[${helpers.getTime()}] (StandardController->login_post) Fehler ${err} !!!`);
            } else {
                debuglog(`[${helpers.getTime()}] (StandardController->login_post) LastLogin wurde aktualisiert ***`);
            }
        });
    })
    // ,
    // (request, response, next) => {
    //     debuglog(`[${helpers.getTime()}] (Standard Controller->login_post) ***`);
    // }
];
*/

// login
exports.login_post = [passport.authenticate("local",
                     {
                           failureRedirect: "/catalog/login",
                           failureFlash: true
                     }),
                     (request, response) => {
                        var query = { "user": request.user.id };
                        var update = { lastLogin: new Date().toISOString() };
                        var options = { new: true, useFindAndModify: false};
                        UserInfo.findOneAndUpdate(query, update, options, (err, user) => {
                            if (err) {
                                debuglog(`[${helpers.getTime()}] (StandardController->login_post) Fehler ${err} !!!`);
                            } else {
                                debuglog(`[${helpers.getTime()}] (StandardController->login_post) LastLogin wurde aktualisiert ***`);
                            }
                        });
                        response.redirect("/");
                    }];

// Register
exports.register_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling register get ***`);
    response.render("register_form");
};

exports.register_post = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling register post ***`);

    // Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        email: request.body.email,
        }), request.body.password, (err, user) => {
            if (err) {
                debuglog(`[${helpers.getTime()}] (Standard Controller) - Fehler in register-Route: ${err.message} !!!`);
                response.redirect("/catalog/register");
            } else {
                debuglog(`[${helpers.getTime()}] (Standard Controller) - Registration was good ***`);
                passport.authenticate("local", (err,user,info) => {
                    debuglog(`[${helpers.getTime()}] - Inside the authenticate callback ***`);
                    if (err) {
                        return next(err);
                    }
                    response.redirect("/catalog/login");
                })(request, response, next);
            }
        });
};

// Password Recover
exports.passwordRecover_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling Password recover get ***`);
    response.render("password_recover", {});
};

exports.passwordRecover_post =  (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling Password recover post ***`);
    response.send("*** Leider noch nicht umgesetzt ***");
};

exports.register_useraccount_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling Register User Account get ***`);
    response.render("useraccount_register")
};

// Anlegen eines neuen Bentzerkontos mit Avatarbild
exports.register_useraccount_post = [
    imageUpload.single("avatar"), 
    (request, response, next) => {
        debuglog(`[${helpers.getTime()}] (Standard Controller) - calling Register User Post Account ***`);
        // Jetzt das UserInfo-Objekt anlegen
        // Die UserId, die für das UserInfo-Objekt benötigt wird, wird auch über das request-Objekt geliefert
        // Am Anfang kam hier immer UserInfo.save() is not a function?
        var avatarFilename =  request.file != undefined ? request.file.filename : "SmileyHelfer.png";
        var userNeu = new UserInfo({
            user: request.user.id,
            fullname: request.body.fullname,
            city: request.body.city,
            country: request.body.country,
            gender: request.body.gender,
            faculty: request.body.faculty,
            syllabus: request.body.syllabus,
            avatar: avatarFilename,
            birthdate: request.body.birthdate
        });
        userNeu.save(err => {
            if (err) {return next(err);}
            debuglog(`[${helpers.getTime()}] - Neuer User wurde angelegt... ***`);
        });
        // Zurück zur UserInfo-Seite
        response.render("useraccount_detail", {title: "Alle Details zum Benutzerkonto", userinfo: userNeu});
    }
]

// Anzeigen der Eigenschaften eines Benutzerkontos
// TODO: Aus der Anzeigeform eine Update Form machen
exports.useraccount_get = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] - (Standard Controller) calling Register User Account get ***`);
    var userId = request.user.id;
    debuglog(`[${helpers.getTime()}] - (Standard Controller) current UserId= ${userId} ***`)
    // Lokalisiere das eine UserInfo-Objekt
    UserInfo.findOne({user:userId})
    .then(userInfo => {
        if (userInfo) {
            debuglog(`[${helpers.getTime()}] (Standard Controller) - UserInfo-Objekt mit Id= ${userId} gefunden ***`)
        } else {
            // Nicht gefunden, wieder zurück ins Hauptmenü (?)
            debuglog(`[${helpers.getTime()}] (Standard Controller) - Es gibt kein UserInfo-Objekt mit Id= ${userId} !!!`)
            userInfo = {id:-1}
        }
        response.render("useraccount_detail", {userinfo: userInfo});
    })
    .catch(err => {
        response.render("error", {error: err})
    })
}

// Abfrage eines UserInfo-Objekts über seine Id
exports.useraccount_getId = (request, response, next) => {
    var userId = request.params.id;
    debuglog(`[${helpers.getTime()}] (Standard Controller->useraccount_getId) - UserId= ${userId} ***`)
    UserInfo.findById(userId)
    .then(userInfo => {
        if (userInfo) {
            debuglog(`[${helpers.getTime()}] (Standard Controller->useraccount_getId) - UserInfo-Objekt ${userId} gefunden ***`)
        } else {
            // Nicht gefunden, wieder zurück ins Hauptmenü (?)
            debuglog(`[${helpers.getTime()}] (Standard Controller) - Es gibt kein UserInfo-Objekt mit Id= ${userId} !!!`)
            userInfo = {id:-1}
        }
        response.render("useraccount_detail", {userinfo: userInfo});
    })
    .catch(err => {
        response.render("error", {error: err})
    })
}

// Aufruf der About-Seite
exports.about = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] (Standard Controller) - calling about ***`);
    response.render("about");
};

// Aufruf soll nur nach Anmeldung möglich sein
exports.adminuser = [isLoggedIn, 
     (request, response, next) => {
     debuglog(`[${helpers.getTime()}] (Standard Controller) - calling adminuser ***`);
     UserInfo.find()
     .then(userList => {
        response.render("admin_user",{userlist:userList});
     });
}];