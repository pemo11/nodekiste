// File: HalloNodeAsync01.js - Das erste Node-Server-Beispiel, dieses Mal aber mit async und wait
// Beispiel scheint zu funktionieren, aber der Unterschied ist mir noch nicht klar?

var http = require("http");
var portNr = 8082;

const init = async () => {
    const server = http.createServer((request, response) => {
        // HTTP header mit einem Status: 200 : OK und Content Type: text/plain senden
        response.writeHead(200, {"Content-Type": "text/plain"});
        
        // Als Response-Body wird wieder ein eher belangloser Text gesendet
        response.end("Zur Abwechslung einmal async - der neue Trend?`\n");
     });
     await server.listen(portNr);

}

init();
 
 // Kontrollmeldung für die Konsole ausgeben
 console.log(`Node.js horcht auf http://127.0.0.1:${portNr}`);