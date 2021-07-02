// file: PassportAuthenticate3.js
// Erstellt: 27/06/21
// In diesem Beispiel kombiniere ich index.js aus Tutorial 4 und PassportAuthenticate2.js, da bei Tutorial 4 die Anmeldung
// funktioniert und keine session-collection in der Datenbank abgelegt wird
// Ich verwende vor allem passport-local-mongoose als weitere Middleware, eventuell liegt es auch daran

const express = require("express");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { response } = require("express");

const flash = require("connect-flash");

require("dotenv").config({path: __dirname + "/.env3"});

var conStr = process.env.conStr;

const Schema = mongoose.Schema;
// Wichtig: password oder hash kommen nicht vor, da sie automatisch angelegt werden
const UserSchema = new Schema({
    username: String,
    email: String,
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema, "User");

mongoose.connect(conStr, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {
    console.log("*** Verbindung war erfolgreich ***")
    // Beim ersten Mal ein paar User registrieren
    // Wichtig: register ist eine passportLocalMongoose function, sie gibt es also normalerweise nicht
    // Interessant ist, dass die Properties salt und hash automatisch angelegt werden und die Property Password nicht vorhanden ist
    // Auch das hängt mit dem passportLocalMongoose Plugin zusammen
    // https://alto-palo.com/blogs/nodejs-authentication-with-passportjs-passport-local-mongoose/
    // User.register({username:"peter", email:"peter@localhost.local"}, "peter");
    // User.register({username:"paul", email:"paul@localhost.local"}, "paul");
    // User.register({username:"mary", email:"mary@localhost.local"}, "mary");
    })
.catch(err => {
    console.log(`!!! Fehler beim Herstellen der Verbindung (${err}) !!!`);
});

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.static(__dirname + "/public"));
app.use(flash());

// Hier wird keine Session-Verwaltung mehr mongodb verwendet
const expressSession = require("express-session")({
    secret: "geheim+1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2*60*1000,
        sameSite:true
    },   
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession);

// =======================
// Passport
// =======================

app.use(passport.initialize());
app.use(passport.session());

// Ein weiterer Komfortgewinn von passportLocalMongoose
// Die lokale Strategie wird für das User-Objekt verwendet
passport.use(User.createStrategy());

// Der Aufruf von serializeUser und deserializeUser wird vereinfacht
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// M I D D L E W A R E
// =======================

function isLoggedIn(request, response, next) {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
}

app.listen(portNr, () => {
    console.log(`*** Der Server horcht auf Port-Nr ${portNr} ***`)
});

// Nach einer erfolgreichen Anmeldung soll der aktuelle User abgelegt werden ?
app.use((request, response, next) => {
    response.locals.currentUser = request.user;
    next();
})

// =======================
// R O U T E S
// =======================

app.get("/", (request, response, next) => {
    console.log("*** Calling the get / route ***");
    var user = {username: "Anonyomous"}
    if (!response.locals != undefined)
    {
        user = response.locals.currentUser != undefined ? response.locals.currentUser : {username: "Anonyomous"};
    }
    response.render("index", {user:user, isAuthenticated:request.isAuthenticated()})
});

app.post("/login", 
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: "Invalid username or password."
        }),
        (request, response, next) => {
            console.log("*** Calling the successfull post login route ***");
            response.redirect("/", {isAuthenticated:isLoggedIn()});
});

app.get("/login", (request, response) => {
    console.log("*** Calling the get login route ***");
    response.render("login");
});

app.get("/register", (request, response) => 
{
    console.log("*** Calling the get register route ***");
    response.render("register")
});

app.post("/register", (request, response, next) => {
    console.log("*** Calling the post register route ***");

    // Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        password: request.body.password,
        }), request.body.password, (err, user) => {
            if (err) {
                console.log("!!! Fehler in register-Route: " + err.message + "!!!");
                response.redirect("/register");
            } else {
                console.log("*** Registration was good ***");
                passport.authenticate("local", (err,user,info) => {
                    console.log("*** Inside the authenticate callback ***");
                    if (err) {
                        return next(err);
                    }
                    response.redirect("/login");
                })(request, response, next);
            }
        });
});

// Logout wird als get umgesetzt
app.get("/logout", (request, response) => {
    console.log("*** Calling the get logout route ***");
    // Passport hängt ein logout() an das request-Objekt an
    // http://www.passportjs.org/docs/logout/
    request.logout();
    response.redirect("/");
});

app.get("/users", isLoggedIn, (request, response) => {
    console.log("*** Calling the get user route ***");
    var userlist = [];
    User.find()
    .then((result) => {
        userlist = result
        response.render("users", {users: userlist})
    })
    .catch((err) => {
        console.log(`!!! Fehler bei User.find (${err}) !!!`)
        // !! noch nicht getestet !!!
        response.render("error", {error: err})
    })
});

// =======================
// Start
// =======================

// const führt zu einem Cannot access 'portNr' before initialization-Fehler?
var portNr = process.env.portNr || 8018;

app.listen(portNr, () => {
    console.log(`*** Der Server lauscht ganz andächtig auf Port-Nr ${portNr} ***`)
});

// noch einbauen
// Passwort setzen: user.setPassword(req.body.password, function(err, user){ ..
// Passwort ändern: ser.changePassword(req.body.oldpassword, req.body.newpassword, function(err) ...