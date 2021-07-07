// file: Beispiel01.js
// Erstellt: 07/07/21
// IndexDB ist ein ObjectStore, der KeyValue-Paare speichert
// Jeder ObjectStore muss einen eindeutigen Namem besitzen
// Eine Datenbank muss geöffnet werden
// Lese- und Schreiboperationen werden als Transaktionen durchgeführt

// Schritt 1: Öffnen der Datenbank

// Schritt 2: Object im Store anlegen

// Schritt 3: Eine Transaktion für eine Datenbankoperation starten

// Schritt 4: Warten auf das Ende der Operation (DOM-Event)

// Schritt 5: Das Ergebnis wird über das Request-Objekt geliefert

const express = require("express");
const app = express();

var portNr = 8052;

app.get("/", (request, response) => {
    // response.sendFile(__dirname + "/indexDB01.html");
    // response.sendFile(__dirname + "/indexDB02.html");
    // response.sendFile(__dirname + "/indexDB03.html");
    response.sendFile(__dirname + "/indexDB04.html");
});

app.listen(portNr, () => {
    console.log(`*** Der kleine Server wartet auf PortNr ${portNr} ***`);
})