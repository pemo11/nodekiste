// File: SocketCounterServer.js
// Erstellt: 07/06/21

const http = require("http");
const socket = require("socket.io");

const portNr = 8008;

var counterList = [];

var server = http.createServer((request, response)=> {
        response.writeHead(200, {"content-Type": "text/html; charset=utf-8"});
        counterList.forEach((counter, i) => {
            response.write(`Counter=${i} Value=${counter.value}`)
        });
        response.end("", "utf-8");
}).listen(portNr, "127.0.0.1");

console.log(`*** Der Server horcht auf Port ${portNr} ***`);

// !!! Vermeidet die CORS-Fehlermeldung !!!
const io = socket(server,{ cors: { origin: '*', }});

io.on("connection", (socket) => {
    console.log("*** Die Socket-Verbindung wurde geöffnet ***");
    socket.on("disconnect", () => {
        console.log("*** Sockert-Verbindung geschlossen ***");
    });
});

console.log(`*** Socket.io horcht auch ***`);

