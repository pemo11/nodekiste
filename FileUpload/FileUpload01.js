// File: FileUpload01.js
// formidable muss per npm install installiert werden
// alles funktioniert, lediglich die Dateiauswahl-Form sieht nicht sehr attraktiv aus

var http = require("http");
var fs = require("fs");
var formidable = require("formidable"); 
var express = require("express");

app.set("view engine","ejs");
app.set("views", __dirname + "/views");

var portNr = 8082;

app.get("/", (request, response) =>  {
    response.render("index1");
});

app.post("/upload", (request, response) =>  {
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        var srcPath = files.uploader.path;
        var destPath = __dirname + "/filedrop/" + files.uploader.name;
        // ein rename()-Aufruf führt zu einem EXDEV: cross-device link not permitted, 
        fs.copyFile(srcPath, destPath, function (err) {
            if (err) throw err;
        // src-Datei löschen - im Allgemeinen nicht erforderlich, da sie sich im temp-Verzeichnis befinden
        fs.unlink(srcPath, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Datei entfernt:", srcPath);
            }
        });
        response.write("Die Datei wurde ordnungsgemäß hochgeladen");
        response.end();
        });
    });
});

app.listen(portNr, null, () => {
    // Kontrollmeldung für die Konsole ausgeben
    console.log(`Node.js horcht auf http://127.0.0.1:${portNr}`);
});
 
