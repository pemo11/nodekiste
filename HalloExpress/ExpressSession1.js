// file: ExpressSession1.js
// Erstellt: 17/06/21
// Beispiel geht nach ein paar kleineren Korrekturen gegenüber dem Code aus dem Video
// https://www.youtube.com/watch?v=J1qXK66k1y4
// Es liegt offenbar an der Version von connect-mongo
// In der aktuellen Version, kann kein (session) angehängt werden
// Die Lösung war connect-mongodb-session
// Insgesamt geht es jetzt;)

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const MongoStore = require("connect-mongo");
const MongoDBStore = require("connect-mongodb-session")(session);
var app = express();

const dbString = "mongodb://localhost:27017/tutdb";

mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
   console.log("*** Connected again, I sagte nur, Connected again... ***");
});

/* Führt zu einem Fehler
Error: Cannot init client. Please provide correct options
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: "sessions"
});
*/

// bei secure:true wird offenbar kein Cookie gesetzt, dann funktioniert es nicht?
// Alternative: 

app.use(session({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: dbString}),
    cookie: {
        maxAge: 60000,
        sameSite: true,
    }
}));


// err wichtig für die Fehlerbehandlung...
app.use((err, request, response, next) => {
    console.log(`*** Ich werde halt immer gerufen - jetzt auch mit err=${err} ***`);
    next();
});

// Gibt es nicht einen Counter, der über express-session automatisch zur Verfügung gestellt wird???
app.get("/", (request, response) => {
    console.log("*** die /-Route ***");
    console.log(request.session);
    if (request.session.counter) {
        request.session.counter++;
    } else {
        request.session.counter = 1;
    }
    response.send(`<H3 style="font-family:verdana;font-size:12pt;">Das ist Dein ${request.session.counter}.ter Besuch</H3>`)
});

portNr = 8036;

app.listen(portNr, () => {
    console.log(`*** Horsche mal, ser Server horscht uff ${portNr} *** `)
})