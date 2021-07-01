// File: FileUpload02.js
// Erstellt: 01/07/21
// Wichtig: app.configure() gibt es seit Express 4.0 nicht mehr, ich verwende Version 6.14.13
// Funktioniert sehr gut, bis auf die Komprimierung, die steht noch aus

var express = require("express")
var app = express();
const multer = require("multer");
var img = require("easyimage");
var env = require("dotenv").config({path: __dirname + "//.env"});
var path = require("path");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

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
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
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
    response.render("picture", {picture:request.file})
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
    response.render("upload", {userId: 1234});
});

app.listen(portNr, () => {
    console.log(`**** Der Server lauscht ganz gespannt auf PortNr ${portNr} ***`)
});

