// file: MiddlewarePrinzip3.js
// Erstellt: 17/06/21 - Aufruf einer Modul-Function als Middleware

const express = require("express");
const pemo = require(__dirname + "/pemo");
var app = express();

// Die globale Middleware stammt dieses Mal aus einem Modul
// So geht es...
app.use(pemo);

// err wichtig für die Fehlerbehandlung...
app.use((err, request, response, next) => {
    console.log(`*** Ich werde halt immer gerufen - jetzt auch mit err=${err} ***`);
    next();
});

app.get("/demo", (request, response) => {
    console.log("*** die demo-Route ***");
    response.send("<H3>Ja, ja, die Middleware, die kann's</H3>")
});

portNr = 8036;

app.listen(portNr, () => {
    console.log(`*** Horsche mal, ser Server horscht uff ${portNr} *** `)
})

