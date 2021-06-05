// File: HalloExpress04.js - dieses Mal mit einer View
// ejs muss separat installiert werden, npm install ejs --save

var express = require("express");
var app = express();
var path = require("path");

app.set("view engine","ejs");
// Wichtig, damit nicht das views-Verzeichnis verwendet wird auf der Ebnene, auf der ejs installiert wurde
app.set("views", __dirname + "/views");
var portNr = 8082;
var hostAdr = "127.0.0.1"

app.get("/", (request, response) => {
    htmlText = "<h3>Willkommen bei Node-Express-Beispiel Nr. 4</h3>"
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(htmlText);
    response.end();
});

// Über diese Route soll die View Daten1 geliefert werden
app.get("/daten", (request, response) => {
    // Auswahl der View - ohne Datenübergabe
    response.render("Daten1",{})
});

var server = app.listen(portNr,hostAdr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})