// file: index.js
// erstellt: 02/07/21
// ein weiteres Beispiel mit Mulder, bei dem auch die anderen Form-Eingaben ausgewertet werden
// https://stackoverflow.com/questions/58474765/how-to-call-multer-middleware-inside-a-controller-in-nodejs

var express = require("express")
var app = express();
const multer = require("multer");
var img = require("easyimage");
var env = require("dotenv").config({path: __dirname + "//.env"});
var path = require("path");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

var userList = [];

userList.push({
    username: "Pemo",
    avatar: "avatar_1625162298048.png"
});

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

// Wichtig: avatar ist der Name des input-Elements vom Typ "file"
// Ansonsten resultiert ein "unexpected field" error
app.post("/upload", imageUpload.single("avatar"), (request, response) => {
    // Über request.body stehen alle Felder zur Verfügung - auch userid
    // response.send(request.file)
    userList.push({
        username: request.body.username,
        eMail: request.body.email,
        avatar: request.file.filename
    });
    response.render("index", {userlist: userList})
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message })
})

/*
img.info(request.files.userFile.path, (err, stdout, stderr) => {
if (err) throw err;
img.rescrop(
{
    src: req.files.userFile.path, dst: fnAppend(req.files.userFile.path, "thumb"),
    width: 50, height: 50
}, (err, image) => {
    if (err) throw err;
    respond.send({image: true, file: request.files.userFile.originalname,
        savedAs: request.files.userFile.name, 
        thumb: fnAppend(request.files.userFile.name, "thumb")});
});
*/

var portNr = process.env.portNr;

app.get("/", (request, response) => {
    response.render("index", {userlist: userList});
});

app.listen(portNr, () => {
    console.log(`**** Der Server lauscht ganz gespannt auf PortNr ${portNr} ***`)
});

