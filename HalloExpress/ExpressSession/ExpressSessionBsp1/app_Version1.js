// ExpressAuthSession.js - erstellt 18/06/21
// Ein Beispiel für eine Authentifzierung in einer Express App im Rahmen einer Session
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Version 1 - alles funktioniert, es wird eine Session in der Mongo DB abgelegt und es wird ein 
// Session-Cookie an den Browser geschickt

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const MongoStore = require("connect-mongo");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ==== Datenbank ====

// Ist offenbar nicht erforderlich!
// const conn = mongoose.createConnection(process.env.DB_CON, { useNewUrlParser: true,useUnifiedTopology: true } );

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
    response.send("<h3>hello, squid!</h3>");
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