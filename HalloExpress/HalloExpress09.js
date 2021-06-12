// File: HalloExpress09.js - Messwertanzeige über Datumauswahl, aber ohne Anmeldungen

var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));

var path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

app.set("view engine", "ejs");
// Wichtig, damit nicht das views-Verzeichnis verwendet wird auf der Ebnene, auf der ejs installiert wurde
app.set("views", __dirname + "/views");
// Verzeichnis für die statischen Dateien festlegen
app.use(express.static(__dirname + "/public"));

var portNr = 8082;
var hostAdr = "127.0.0.1"

// Abrufen der index-View
app.get("/", (request, response) => {
    console.log("*** Route / wird abgerufen ***");
    // Einfache Datumsauswahl ohne jQueryUI
    // response.render("index2");
    // Mit jQueryUI DatePicker
    response.render("index4");
});

app.post("/daten", (request, response) => {
    console.log("*** Route daten wird abgerufen ***");
    datum = request.body["datum"]
    response.render("daten3", {datum:datum});
    response.end();

});

var server = app.listen(portNr,hostAdr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})