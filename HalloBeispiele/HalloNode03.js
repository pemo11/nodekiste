// File: Hallo03.js - Wie Beispiel Nr. 2 - nur mit einer anonymen Function

var http = require("http");
var portNr = 8082;

http.createServer((request, response) => {
    // HTTP header mit einem Status: 200 : OK und Content Type: text/plain senden
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    // Als Response-Body wird wieder ein eher belangloser Text gesendet
    response.end("Node.js ist auch bei JavaScript auf dem allerneusten Stand!\n");
 }).listen(portNr);
 
 // Kontrollmeldung für die Konsole ausgeben
 console.log(`Node.js horcht auf http://127.0.0.1:${portNr}`);