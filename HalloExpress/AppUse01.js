// file: AppUse01.js
// erstellt: 15/06/21
// https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use

const express = require("express");
const app = express();

// Wird als Teil der Pipeline aufgerufen, wenn ein Request eintrifft
// Also, das klassische Middleware-Prinzip
app.use((request, response, next) => {
    console.log("*** Alles klaro ***");
    // Wichtig, da es ansonsten nicht weiter geht
    next();
});

portNr = 8030;

app.get("/", (request, response) => {
    response.send("Hello, Squid!");
});

app.listen(portNr, () => {
    console.log(`*** Wo horcht der Server? Auf Port ${portNr} natürlich ***`)
});