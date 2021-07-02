// file: standardController.js

const {body,validationResult } = require("express-validator");
const util = require("util");
const debuglog = util.debuglog("app");
const User = require("../models/user");
const UserInfo = require("../models/userinfo");
const passport = require("passport");
const path = require("path");
const { userInfo } = require("os");
const fs = require("fs");
const multer = require("multer");

var express = require('express');
const { response } = require("express");
var router = express.Router();

// Ein Zielverzeichnis anlegen
const imageDrop = multer.diskStorage({
    // Den Pfad des Zielverzeichnis angeben
    destination: path.join( __dirname , "public/filedrop"),
      filename: (request, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});

// Die Upload-Aktion festlegen
const imageUpload = multer({
    storage: imageDrop,
    limits: {
      fileSize: 100000
    },
    fileFilter(request, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // Es sollen nur png und jpg Dateien hoch geladen werden können
         return cb(new Error("Nur Bitmaps erlaubt!"))
       }
     cb(undefined, true)
  }
}) 

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
                response.redirect("/catalog/register");
            } else {
                debuglog("*** Registration was good ***");
                passport.authenticate("local", (err,user,info) => {
                    debuglog("*** Inside the authenticate callback ***");
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
    debuglog("*** Standard Controller - calling Password recover get ***");
    response.render("passwordRecover", {});
};

exports.passwordRecover_post =  (request, response, next) => {
    debuglog("*** Standard Controller - calling Password recover post ***");
    response.send("*** Leider noch nicht umgesetzt ***");
};

exports.register_useraccount_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling Register User Account get ***");
    response.render("register_userAccount")
};

exports.register_useraccount_post = [
    imageUpload.single("avatar"),
    (request, response, next) => {
        debuglog("*** Standard Controller - calling Register User Post Account ***");
        // Jetzt das UserInfo-Objekt anlegen
        // Die UserId, die für das UserInfo-Objekt benötigt wird, wird auch über das request-Objekt geliefert
        // Am Anfang kam hier immer UserInfo.save() is not a function?
        var userNeu = new UserInfo({
            user: request.user.id,
            fullname: request.body.fullname,
            city: request.body.city,
            country: request.body.country,
            gender: request.body.gender,
            faculty: request.body.faculty,
            syllabus: request.body.syllabus,
            avatar: request.body.avatar,
            birthdate: request.body.birthdate
        });
        userNeu.save()
        .then(() => {
            debuglog("*** Das UserInfo-Objekt wurde angelegt ***")
        })
        .catch(err => {
            debuglog(`!!! Fehler beim Abspeichern des UserInfo-Objekts $(err.message)  !!!`)
        })
        // Zurück zur UserInfo-Seite
        response.render("useraccount_detail", {title: "Alle Details zum Benutzerkonto", userinfo: userNeu});
    }
]

/*
exports.register_useraccount_post = (request, response, next) => {
    debuglog("*** Standard Controller - calling Register User Post Account ***");

    // Hochladen des Avatar-Bildes zuerst
    var form = new formidable.IncomingForm();
    form.parse(request, (err, fields, files) => {
        var srcPath = files.avatarUploader.path;
        var destPath = __dirname + "/../filedrop/" + files.avatarUploader.name;
        // ein rename()-Aufruf führt zu einem EXDEV: cross-device link not permitted, 
        fs.copyFile(srcPath, destPath, function (err) {
            if (err) throw err;
            // src-Datei löschen - im Allgemeinen nicht erforderlich, da sie sich im temp-Verzeichnis befinden
            fs.unlink(srcPath, function (err) {
                if (err) {
                    debuglog(`!!! Fehler beim unlink-Aufruf: ${err.Message} !!!`);
                } else {
                    debuglog(` *** UserAccount Upload - die Datei ${srcPath} wurde entfernt ***`);
                }
            });

        });
    });

}
*/

// Anzeigen der Eigenschaften eines Benutzerkontos
// TODO: Aus der Anzeigeform eine Update Form machen
exports.useraccount_get = (request, response, next) => {
    debuglog("*** Standard Controller - calling Register User Account get ***");
    UserInfo.find({id: request.user.id})
    .then(userInfo => {
        if (userInfo) {
            response.render("useraccount_detail", {userinfo: userInfo});
        } else {
            // Nicht gefunden, wieder zurück ins Hauptmenü (?)
            response.redirect("/")
        }
    })
    .catch(err => {
        response.render("error", {error: err})
    })
}
