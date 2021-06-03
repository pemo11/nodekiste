// File: HalloExpress03.js - dieses Mal wird eine Datei responded

var express = require("express");
var app = express();
var path = require("path");

var portNr = 8082;

app.get("/", (request, response) => {
    htmlText = "<h3>Willkommen bei Noohdjaeess!</h3>"
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(htmlText);
    response.end();
});

app.get("/daten", (request, response) => {
    response.sendFile(path.resolve("ExpressBeispiele//Messwerte.html"));
});

var server = app.listen(portNr, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})