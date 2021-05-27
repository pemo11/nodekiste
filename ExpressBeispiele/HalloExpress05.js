// File: HalloExpress05.js - dieses Mal mit einer Index-View
// Ein Klick auf den Daten abrufen-Button hat aktuell ein Cannot POST /Daten2 zur Folge - es fehlt die POST-Route

var express = require("express");
var app = express();
var path = require("path");

app.set("view engine","ejs");
// Wichtig, damit nicht das views-Verzeichnis verwendet wird auf der Ebnene, auf der ejs installiert wurde
app.set("views", __dirname + "/views");
var portNr = 8082;
var hostAdr = "127.0.0.1"

app.get("/", (request, response) => {
    response.render("index");
});

// es gibt keine daten-view mehr, da die Daten nicht direkt abrufbar sein sollen

var server = app.listen(portNr,hostAdr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})