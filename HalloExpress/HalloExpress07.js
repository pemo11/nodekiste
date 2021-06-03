// File: HalloExpress07.js - dieses Mal mit einer Post-Route und Auswertung per body-parser-Middlwware

var express = require("express");
var app = express();

var bodyParser = require("body-parser")

// Ab Express 4.16 musss bodyParser nicht mehr verwendet werden
app.use(bodyParser.urlencoded({extended: true}));

var path = require("path");

app.set("view engine", "ejs");
// Wichtig, damit nicht das views-Verzeichnis verwendet wird auf der Ebnene, auf der ejs installiert wurde
app.set("views", __dirname + "/views");
var portNr = 8082;
var hostAdr = "127.0.0.1"

app.get("/", (request, response) => {
    console.log("*** Route / wird abgerufen ***");
    response.render("index");
});

app.post("/login", (request, response) => {
    console.log("*** Route login wird abgerufen ***");
    // Die Daten aus dem Formular holen
    username = request.body["name"]
    passwort = request.body["password"]
    response.render("Login1", {user:username,password:passwort});
    response.end();
});

var server = app.listen(portNr,hostAdr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})