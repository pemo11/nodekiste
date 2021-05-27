// File: HalloExpress06.js - dieses Mal mit einer Post-Route und direkter AUswertung per request.body
// Wichtig; Diese Vereinfachung gibt es erst ab Express 4.16+
// Zuvor war der direkte Zugriffe auf den Http-Body aufwändiger, da die Daten über die Streams gelesen werden mussten, daher war body-parser praktisch Pflicht
// https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields/63999686#63999686

var express = require("express");
var app = express();
// ohne diesen Aufruf gibt es beim request-Objeekt keine body-Property
// Das moderne Pendant zu app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));

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