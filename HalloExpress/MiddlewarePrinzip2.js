// file: MiddlewarePrinzip2.js
// Erstellt: 17/06/21 - das Prinzip der Fehlerbehandlung bei Express Middleware-Prinzip erklärt 
// https://www.youtube.com/watch?v=AZDTM0DiLG8&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=4
const express = require("express");
var app = express();

// Definition einer globalen Middleware
const Middleware1 = (request, response, next) => {
    request.spezial = 1234;
    console.log(`*** Middleware wurde gerufen (was macht Spezial?, Spezial=${request.spezial}) ***`);
    next();
};
app.use(Middleware1);

app.use((request, response, next) => {
    console.log("*** Ich werde immer gerufen ***");
    next();
});

const ErrorHandler = (err, request, response, next) => {
    if (err) {
        console.log(`!!! Es trat leider ein Fehler auf ${err} !!!`);
        response.send(`<h3 style='color:red;font-weigt:bold'>${err.message}</h3>`);
    }
};

const Middleware2 = (request, response, next) => {
    console.log("*** Middleware2 wurde gerufen ***");
    var errObj = new Error("Ein fehlerhafter Fehler");
    next(errObj);
};


app.get("/", Middleware1, Middleware2, (request, response) => {
    console.log("*** Die / Route wurde gerufen ***");
    response.send("<h3>Hello, Pemo!</h3>");
});

portNr = 8036;

app.listen(portNr, () => {
    console.log(`*** Horsche mal, ser Server horscht uff ${portNr} *** `)
})

// Wichtig: ErrorHandler muss am Ende festgelegt werden
app.use(ErrorHandler);
