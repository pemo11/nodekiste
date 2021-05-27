// File: HalloExpress08.js - alle Anmeldungen sollen über die Admin-View abgerufen werden können

var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));

var path = require("path");

// ohne var/let ist es eine globale Variable
// Alternativ mit global. oder GLOBAL.
global.anmeldungen = [];

app.set("view engine", "ejs");
// Wichtig, damit nicht das views-Verzeichnis verwendet wird auf der Ebnene, auf der ejs installiert wurde
app.set("views", __dirname + "/views");
var portNr = 8082;
var hostAdr = "127.0.0.1"

// Abrufen der index-View
app.get("/", (request, response) => {
    console.log("*** Route / wird abgerufen ***");
    response.render("index");
});

// Abrufen der admin-View
app.get("/admin", (request, response) => {
    console.log("*** Route admin wird abgerufen ***");
    response.render("admin", {"daten":anmeldungen});
});

// Wird als Reaktion auf den POST-Request aus der Index-View ausgeführt
app.post("/login", (request, response) => {
    console.log("*** Route login wird abgerufen ***");
    // Die Daten aus dem Formular holen
    username = request.body["name"]
    passwort = request.body["password"]
    // durch let ist der Gültigkeitsbereich auf den Block beschränkt
    let curDate = new Date();
    // .padStart wurde mit ECMA 2017 eingeführt
    let curTime = curDate.getHours().toString().padStart(2, "0") + ":" + curDate.getMinutes().toString().padStart(2, "0") + ":" + curDate.getSeconds().toString().padStart(2, "0");
    global.anmeldungen.push({name: username, password: passwort, timestamp:curTime});
    response.render("Login2", {user:username,password:passwort});
    response.end();
});

var server = app.listen(portNr,hostAdr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})