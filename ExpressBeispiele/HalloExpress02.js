// File: HalloExpress02.js - eine weitere Route

var express = require("express");
var app = express();

var portNr = 8082;

app.get("/", (request, response) => {
    response.send("Response, bedient ich ihn habe...");
});

app.get("/daten", (request, response) => {
    var output = "<table border='1' width='20%'>";
    var count = 100;
    output += "<th>Nr</th><th>Messwert</th>"
    for(var i=1;i<=count;i++) {
        z = Math.random() * 100;
        output += "<tr><td>" + i + "</td><td>" + z + "</td></tr>"
    }
    output += "</table>"
    response.write(output);
    response.end();
});

var server = app.listen(portNr, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})