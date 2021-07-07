// file: app.js
// Erstellt: 02/07/21
// https://alto-palo.com/blogs/nodejs-authentication-with-passportjs-passport-local-mongoose/
// Leider schlechter Artikel, das habe ich erst bei der Umsetzung festgestellt, da offenbar unvollständig
// um auf einmal gibt es eine Variable userController und es kommt JWT vor!
// Das Beispiel funktioniert daher aktuell noch nicht

const express = require("Express");
const app = new express();

var User = require("models/user");

app.use(passport.initialize());
app.use(passport.sesssion());

const localStrategy = require("passport-local").Strategy;
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

portNr = 8046;

app.listen(portNr, (request, response) => {
    console.log(`*** Der Server lauscht auf Port ${portNr} dem was kommen mag ***`)
})