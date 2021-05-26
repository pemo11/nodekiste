// File: HalloExpress01.js - dieses Mal Express so einfach wie möglich
// express muss per npm installiert werden

var express = require("express");
var app = express();

var portNr = 8082;

app.get("/", (request, response) => {
    response.send("Response, bedient ich ihn habe...");
});

var server = app.listen(portNr, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Ich bin der Host ${host} und laufe auf Port ${port}...`);
})