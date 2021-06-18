// file: MiddlewarePrinzip1.js
// Erstellt: 17/06/21 - das Express Middleware-Prinzip erklärt 

const express = require("express");
var app = express();

app.use((request, response, next) => {
    console.log("*** Ich werde immer gerufen ***");
    next();
});

const Middleware1 = (request, response, next) => {
    request.spezial = 1234;
    console.log("*** Middleware1 wurde gerufen ***");
    next();
};

const Middleware2 = (request, response, next) => {
    console.log(`*** Middleware2 wurde gerufen (übrigens, Spezial=${request.spezial}) ***`);
    next();
};

// Fügt eine weitere (globale) Middleware zur Ausführungspipeline hinzu
// Diese wird aber als erste ausgeführt!
const Middleware3 = (request, response, next) => {
    console.log(`*** Middleware3 wurde gerufen (was macht Spezial?, Spezial=${request.spezial}) ***`);
    next();
};
app.use(Middleware3);

app.get("/", Middleware1, Middleware2, (request, response) => {
    console.log("*** Die / Route wurde gerufen ***");
    response.send("<h3>Hello, Pemo!</h3>");
});

portNr = 8036;

app.listen(portNr, () => {
    console.log(`*** Horsche mal, ser Server horscht uff ${portNr} *** `)
})