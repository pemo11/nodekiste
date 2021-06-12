// file: ExpressMitFlash01.js
// Erstellt: 12/06/2021
var express = require("express");
var app = express();
const session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");

var portNr = 8082;

app.set("view engine", "ejs");

app.use(cookieParser('secretString'));

app.use(session({
    secret:"demo+123",
    saveUninitialized: true,
    resave:true})
    );

app.use(flash());

app.get("/", (request, response) => {
    // Es wird lediglich eine Nachricht übertragen
    request.flash("msg1", "Huhu, das ist eine Fläsch-Massage!")
    response.render("flash01");
});

var server = app.listen(portNr, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Ich bin der Horst ${host} und laufe auf Port ${port}...`);
})