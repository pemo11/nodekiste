// file: index.js
// Passport-Tut Nr. 4 - dieses Mal Sitepoint
// https://www.sitepoint.com/local-authentication-using-passport-node-js/
// Dank einer kleinen Erweiterung ist auch ein logout möglich
// https://codedec.com/tutorials/login-using-passport-module-in-node-js/
// Noch nicht getestet: Register

// 28/06/21 - Beispiel funktioniert, nachdem ich etwas an passport.autheticate geändert hatte, was eigentlich
// nicht hätte funktionieren können (?)
// flash-Message wird nicht angezeigt, muss in der view noch eingebaut werden

const express = require("express");
const passport = require("passport");

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { response } = require("express");

const flash = require("connect-flash");

var conStr = "mongodb://localhost:27017/Tut4";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
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
    // User.register({username:"peter", active: false}, "peter");
    // User.register({username:"paul", active: false}, "paul");
    // User.register({username:"mary", active: false}, "mary");
    })
.catch(err => {
    console.log(`!!! Fehler beim Herstellen der Verbindung (${err}) !!!`);
});


require("dotenv").config({path: __dirname + "/.env"});

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(flash());

// const bodyParser = require("body-parser");
const expressSession = require("express-session")({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 2*60*1000  },   
});

// Wichtig: der Body-Parser sorgt dafür, dass die form-Eingabe automatisch für die 
// Authentfizierung verwendet wird
// Seit Express 4.16+ kann bodyParser durch express ersetzt werden
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

// passportLocalMongoose sorgt dafür, dass für das Users-Objekt die lokale Strategie verwendet wird
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const portNr = process.env.portNr || 8018;

// current User
app.use(function (request, response, next){
    response.locals.currentUser = request.user;
    next();
})

// const connectEnsureLogin = require("connect-ensure-login");

// =======================
// M I D D L E W A R E
// =======================

// Fehlermeldung : request ist undefined
// Typischer Anfänger-Idioten-Fehler isLoggedIn() statt nur isLoggedIn
function isLoggedIn(request, response, next) {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
}

app.listen(portNr, () => {
    console.log(`*** Der Server horcht auf Port-Nr ${portNr} ***`)
});

// =======================
// R O U T E S
// =======================

app.get("/", (request, response) => {
    console.log("*** Calling the get / route ***");
    response.sendFile("/public/index.html", {root: __dirname})
});

app.post("/login", 
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: "Invalid username or password."
        }),
        (request, response, next) => {
            console.log("*** Calling the successfull post login route ***");
            response.redirect("/members");
});

app.get("/login", (request, response) => {
    console.log("*** Calling the get login route ***");
    response.sendFile("/public/login.html", {root: __dirname})
});

app.get("/register", (request, response) => 
{
    console.log("*** Calling the get register route ***");
    response.sendFile("/public/register.html", {root: __dirname})
});

app.post("/register", (request, response, next) => {
    console.log("*** Calling the post register route ***");
    // Vergleich der beiden Kennwörter

    // Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        password: request.body.password1,
        }), request.body.password1, (err, user) => {
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
                    response.redirect("/private");
                })(request, response, next);
            }
        });
});

// Logout wird als get umgesetzt
app.get("/logout", (request, response) => {
    console.log("*** Calling the get logout route ***");
    // Hängt Passport automatisch ein logout() an das request-Objekt an? (das wäre natürlich genial, aber dafür ist glaube ich Middlewar auch da?)
    request.logout();
    response.redirect("/");
});

app.get("/private", isLoggedIn, (request, response) => {
    console.log("*** Calling the get private route ***");
    response.sendFile("/public/private.html", {root: __dirname})
});

app.get("/user", isLoggedIn, (request, response) => {
    console.log("*** Calling the get user route ***");
    response.send({user: request.user})
});




