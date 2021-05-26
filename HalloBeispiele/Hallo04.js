// File: Hallo04.js - Wie Beispiel Nr. 3 - dieses Mal mit Https
// Das Schlüsselpaar wird zuvor per Openssl.exe angelegt (unter Windows aus dem github.exe-Verzeichnis)
const https = require("https");
const fs = require("fs");

console.log(__dirname)

// Durch readFilesSync blockiert den Prozess bis alles gelesen ist
const options = {
    // Pfade müssen absolut sein
    key: fs.readFileSync(__dirname + "\\" + "key.pem"),
    cert: fs.readFileSync(__dirname + "\\" + "cert.pem"),
    // passphrase: "!nopw2020"
};

var portNr = 8083;

// Neu ist hier der options-Parameter, der als Erster übergeben werden muss
https.createServer(options, (request, response) => {

    // HTTP header mit einem Status: 200 : OK und Content Type: text/plain senden
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    // Als Response-Body wird wieder ein eher belangloser Text gesendet
    response.end("Node.js ist dank SSL zu ueber 110% sicher (oder?)!\n");
 }).listen(portNr);
 
 // Kontrollmeldung für die Konsole ausgeben
 console.log(`Node.js horcht auf https://127.0.0.1:${portNr}`);