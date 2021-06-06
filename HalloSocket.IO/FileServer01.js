// File: FileServer01.js
// Erstellt: 06/06/21

const http = require("http");
const fs = require("fs");
const socket = require("socket.io");

const portNr = 8008;

var zitate = [];

fs.readFile("./Zitate.txt", "utf-8", (err, daten) => {
    const zeilen = daten.split(/\r?\n/);
    zeilen.forEach(zeile => {
        zitate.push(zeile);
    });
});

var server = http.createServer((request, response)=> {
    fs.readFile("./index.html", (err, daten) => {
        // response.setHeader("Vary", "Origin"); 
        // response.setHeader("Access-Control-Allow-Origin", "*");
        response.writeHead(200, {"content-Type": "text/html; charset=utf-8"});
        response.end(daten, "utf-8");
    });
}).listen(portNr, "127.0.0.1");

console.log(`*** Der Server horcht auf Port ${portNr} ***`);

// !!! Vermeidet die CORS-Fehlermeldung !!!
const io = socket(server,{ cors: { origin: '*', }});

io.on("connection", (socket) => {
    console.log("*** Die Socket-Verbindung wurde geöffnet ***");
    var zitat = zitate[Math.floor(Math.random() * zitate.length)];
    socket.emit("message", {text:zitat});
    socket.on("disconnect", () => {
        console.log("*** Sockert-Verbindung geschlossen ***");
    });
});

console.log(`*** Socket.io horcht auch ***`);

