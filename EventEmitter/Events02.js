// Beispiel Nr. 2 für den Umgang mit Events
// File: Events02.js
// Dieses Mal werden echte "Ereignisse" gemeldet

var events = require("events");
var http = require("http");
var portNr = 8082;

 // Event-Emitter anlegen
var eventEmitter = new events.EventEmitter();

// Listener anlegen
var connectListener1= function ConnectListener() {
    console.log("*** Connect-Event wurde ausgelöst ***");
}

// Event mit Listener verknüpfen
eventEmitter.on("ServerConnect", connectListener1);

http.createServer((request, response) => {

    // Event feuern - alle Listener bekommen etwas auf die Ohren
    eventEmitter.emit("ServerConnect");

    // HTTP header mit einem Status: 200 : OK und Content Type: text/plain senden
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    // Als Response-Body wird wieder ein eher belangloser Text gesendet
    response.end("Node.js ist mal wieder fertig...!\n");
 }).listen(portNr);
 
 // Kontrollmeldung für die Konsole ausgeben
 console.log(`Node.js horcht auf http://127.0.0.1:${portNr}`);
