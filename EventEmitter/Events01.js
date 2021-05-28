// Beispiel Nr. 1 für den Umgang mit Events
// File: Events01.js

var events = require("events");

// Event-Emitter anlegen
var eventEmitter = new events.EventEmitter();

// Listener anlegen
var listner1 = function listner1() {
    console.log("*** Event für Listener1 ausgelöst ***");
}

// Event-Emitter mit Listener verbinden
// Statt test1234 kann ein sinnvollerer Name wie connection verwendet werden
eventEmitter.on("test1234", listner1);

// Event feuern
eventEmitter.emit("test1234");

// Listener wieder entfernen
eventEmitter.removeListener("test1234", listner1);

console.log("*** Der Listener1 hört nicht mehr zu ***");

// Event erneut abfeuern
eventEmitter.emit("test1234");

console.log("*** Auftrag ausgeführt ***");