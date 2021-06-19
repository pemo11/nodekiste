// ExpressAuthSession.js - erstellt 18/06/21
// Ein Beispiel für eine Authentifzierung in einer Express App im Rahmen einer Session
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Version 3 - Mit Passport-Local
// Dieses Beispiel funktionierte komplett am Samstagvormittag (dem 19.6 also)
// Das ist daher ein gutes Beispiel für eine mögliche Einführung (mit Dank an Zach Gollwitzer;)

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// crypto ist bei Node.js "eingebaut"
var crypto = require("crypto");

const MongoStore = require("connect-mongo");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ==== Formalitäten ====

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// ==== Datenbank ====

// Weitere Verbindung wird für User benötigt ?
const conn = mongoose.createConnection(process.env.DB_CON, { useNewUrlParser: true,useUnifiedTopology: true } );

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});

const User = conn.model("User", UserSchema);

// ===== Session einrichten =====

// Dadurch wird die Datenbank express1 mit einer collection sessions angelegt
app.use(session({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: true,            // true ist Voraussetzung, dass cookies gespeichert werden
    store: MongoStore.create({
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        mongoUrl: process.env.DB_CON,
    }),
    cookie: {
        maxAge: 60000,
        sameSite:true
    }
    }));

// Vorsicht bei secure: true -> wenn nicht https wird Cookie nicht gesetzt/zurückgeschickt?
// auch die Cookie-Lebensdauer darf nicht zu kurz sein, da ansonsten das Cookie nicht lang genug existiert

console.log("Alles erledigt, Ursula!")

// ==== Passwort-Funktionality ====

function IsPasswordValid(password, hash, salt) {
    var hashveriyfy = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
    return hash === hashveriyfy;
}

function NewPassword(password) {
    var salt = crypto.randomBytes(32).toString("hex");
    var genhash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
    return {
        salt: salt,
        hash: genhash
    };
}

passport.use(
    new localStrategy((username, password, cb) => {
        User.findOne({username: username})
        .then((user) => {
            if (!user) {
                return cb(null, false);
            }

            const isValid = IsPasswordValid(password, user.hash, user.salt);

            if (isValid) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        })
        .catch(err => {
            cb(err);
        });
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {return cb(err);}
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

// ==== Routen =====

app.get("/", (request, response) => {
    console.log("*** welcome to the index get route ***");
    if (!request.session.viewCount) {
        request.session.viewCount = 1
    } else {
        request.session.viewCount++
    }
    // response.send(`<h3 style="font-family:verdana">Das ist Aufruf Nr. <span style="color:red">${request.session.viewCount}</span></h3>`);
    response.render("index", {viewCount: request.session.viewCount});
});

app.get("/login", (request, response) => {
    console.log("*** Welcome to the login get route ***");
    response.render("login");
});

app.get("/logout", (request, response) => {
    console.log("*** Welcome to the logout get route ***");
    request.logout();
    response.redirect("/");
});

app.get("/loginerror", (request, response) => {
    console.log("*** Welcome to the loginerror get route ***");
    response.render("loginerror");
});

app.post("/login", 
    passport.authenticate("local", {
     failureRedirect: "/loginerror",
     successRedirect: "/members"   
    }),
    (err, request, response, next) => {
        console.log("*** Welcome to the register post route ***");
        if (err) next(err);
});

app.get("/register", (request, response, next) => {
    console.log("*** Welcome to the register get route ***");
    response.render("register");
});

app.post("/register", (request, response, next) => {
    console.log("*** welcome to the register post route ***");
    const saltHash = NewPassword(request.body.password1);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: request.body.username,
        hash: hash,
        salt: salt
    });

    newUser.save()
    .then((user) => {
        console.log(`*** Neuer User wurde registriert: ${user} ***`);
    });

    response.redirect("/login");

});

app.get("/members", (request, response, next) => {
    if (request.isAuthenticated()) {       
        console.log("*** Ursula, Du hast es geschafft! ***");
        // Genial, dass passport an das request-objekt eine user-Property hängt
        response.render("members", {user:request.user});
    } else {
        response.render("login");
    }
});

app.listen(process.env.portNr, () => {
    console.log(`*** Ik glob, ik spinne, der Server horcht auf Port ${process.env.portNr} ***`);
});