// file: ExpressMitFlash02.js
// Erstellt: 12/06/2021 - Beispiel funktioniert auch soweit
var express = require("express");
var app = express();
const session = require("express-session");
var flash = require("express-flash");
// Es geht ohne Cookies, aber eventuell werden sie doch benötigt?
// var cookieParser = require("cookie-parser");

var portNr = 8082;

app.set("view engine", "ejs");

// app.use(cookieParser("geheim1234"));

app.use(session({
    secret:"demo+123",
    saveUninitialized: true,
    resave:true,
}));

app.use(flash());

app.get("/", (request, response) => {
    // Es werden mehrere Info-Messages übertragen
    request.flash("error", "Fehler Nr. 1");
    request.flash("error", "Fehler Nr. 2");
    request.flash("error", "Fehler Nr. 3");
    var messages = ["Nachricht 1A", "Nachricht 1B", "Nachricht 1C"];
    messages.forEach(message => {
        request.flash("info", message);
    });
    request.flash("info", "Und noch was...");
    response.render("flash02");
});

var server = app.listen(portNr, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Ich bin der Horst ${host} und laufe auf Port ${port}...`);
})