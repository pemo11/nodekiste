// ============================================================================
// IMG SS 21
// Autor: Peter Monadjemi (7004123)
// Letzte Aktualisierung: 30/06/21
// ============================================================================

// Allgemeine Deklarationen

const express = require("express");
const app = express();
const util = require("util");
const debuglog = util.debuglog("app");
const path = require("path");
const cookieParser = require("cookie-Parser");
var createError = require("http-errors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const fs = require("fs");

require("dotenv").config({path: __dirname + "/.env"});

var indexRouter = require("./routes/index");
var catalogRouter = require("./routes/catalog");

// ============================================================================
// View engine setup
// ============================================================================
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// ============================================================================
// Datenbank-Initialisierung
// ============================================================================
const mongoose = require("mongoose");
var conStr = process.env.dbCon;

// const User = mongoose.model("User", UserSchema, "User");
const User = require("./models/user")
mongoose.connect(conStr,
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        debuglog("*** Datenbankverbindung wurde hergestellt ***")
    })
    .catch(err => {
        debuglog("!!! Fehler beim Herstellen der Datenbankverbindung !!!");
});


var db = mongoose.connection;
db.on("error", console.error.bind(console, "!!! Fehler beim Herstellen der Datenbankverbindung !!!"));


// ============================================================================
// Express-Initialisierung
// ============================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ============================================================================
// Session-Initialisierung
// ============================================================================

const expressSession = require("express-session")({
    secret: "geheim+1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2*60000,
        sameSite:true
    },   
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession);

// =======================
// Passport-Initialisierung
// =======================

app.use(passport.initialize());
app.use(passport.session());

// Die lokale Strategie wird für das User-Objekt verwendet
passport.use(User.createStrategy());

// Der Aufruf von serializeUser und deserializeUser wird vereinfacht
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// Allgemeine Middleware
// =======================

function isLoggedIn(request, response, next) {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
}

// Nach einer erfolgreichen Anmeldung soll der aktuelle User abgelegt werden 
app.use((request, response, next) => {
    response.locals.currentUser = request.user;
    next();
})

// ============================================================================
// Die Routen
// ============================================================================

app.use("/", indexRouter);
app.use("/catalog", catalogRouter)

// Nicht vorhandene Seiten (404) abfangen und allgemeiner Fehlerhandler
app.use((request, response, next) => {
    next(createError(404));
});
  
// Allgemeiner Error handler
app.use((err, request, response, next) => {

    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get("env") === "development" ? err : {};
  
    // render the error page
    response.status(err.status || 500);
    response.render("error");
  });
  
var httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, "certs/privkey.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certs/cert.pem"))
};

portHttpNr = process.env.portHttpNr;
portHttpsNr = process.env.portHttpsNr

app.listen(portHttpNr, () => {
    debuglog(`*** Der OMI-Studi-Helper horcht per HTTP auf Port ${portHttpNr} ***`);
});

// httpsServer.listen(portHttpsNr, function() {
//  debuglog(`*** Der OMI-Studi-Helper horcht per HTTPS auf Port ${portNrHttps} ***`);
// });







