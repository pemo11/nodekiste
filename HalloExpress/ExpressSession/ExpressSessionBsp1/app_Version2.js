// ExpressAuthSession.js - erstellt 18/06/21
// Ein Beispiel für eine Authentifzierung in einer Express App im Rahmen einer Session
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Version 2 - an das von der express-session-Middleware angehängte Session-Objekt wird mit einer
// customProperty viewCount verwendet - funktioniert auch

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const MongoStore = require("connect-mongo");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ==== Datenbank ====

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

mongoose.model("User", UserSchema);

// ===== Session einrichten =====

// Dadurch wird die Datenbank express1 mit einer collection sessions angelegt
app.use(session({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: true,    // true ist Voraussetzung, dass cookies gespeichert werden
    store: MongoStore.create({
        options: { useNewUrlParser: true,useUnifiedTopology: true },
        mongoUrl: process.env.DB_CON,
})}));

console.log("Alles erledigt, Ursula!")

app.get("/login", (request, response, next) => {
    console.log("*** welcome to the login get route ***");
    if (!request.session.viewCount) {
        request.session.viewCount = 1
    } else {
        request.session.viewCount++
    }
    response.send(`<h3 style="font-family:verdana">Das ist Aufruf Nr. <span style="color:red">${request.session.viewCount}</span></h3>`);
});

app.post("/login", (request, response, next) => {

});

app.get("/register", (request, response, next) => {
    response.send("<h3>Registrierung</h3>");
});

app.post("/register", (request, response, next) => {

});

app.listen(process.env.portNr, () => {
    console.log(`*** Ik glob, ik spinne, der Server horcht auf Port ${process.env.portNr} ***`);
});