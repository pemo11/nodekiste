// file: userController.js

const multer = require("multer");
var img = require("easyimage");
var path = require("path");

var User = require("../models/user");

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

exports.listUser = (request, response, next) => {
    User.find()
    .then((result) => {
        response.render("index", {userlist:result})
    })
    .catch(err => {
        debuglog("!!! Fehler in user_list: " + err);
    })
}

exports.getUser = (request, response, next) => {
    var Id = request.id;
    User.findOneById({id:Id})
    .then(user => {
        
    })
    .catch(err => {
        debuglog("!!! Fehler in user_get: " + err);
    })
}

exports.createUser = [
    imageUpload.single("avatar"),
    (request, response, next) => {
        var newUser = new User({
            username: request.body.username,
            eMail: request.body.email,
            createDate: new Date().toISOString(),
            avatar: request.file.filename
        });
        newUser.save(err => {
            if (err) {return next(err);}
            console.log("*** Neuer User wurde angelegt... ***");
            User.find()
            .then((result) => {
                response.render("index", {userlist:result})
            })
            .catch(err => {
                debuglog("!!! Fehler in user_list: " + err);
            })
        });
    }
]