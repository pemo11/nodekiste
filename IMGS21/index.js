// ============================================================================
// IMG SS 21
// Autor: Peter Monadjemi (7004123)
// Letzte Aktualisierung: 12/07/21
// ============================================================================

// Allgemeine Deklarationen

const express = require("express");
const app = express();
const util = require("util");
const debuglog = util.debuglog("app");
const path = require("path");
const cookieParser = require("cookie-parser");
var createError = require("http-errors");
const passport = require("passport/lib");
const passportLocalMongoose = require("passport-local-mongoose");
const https = require("https");
const fs = require("fs");
const flash = require("connect-flash");
const helpers = require(__dirname + "/helpers");
const logger = require(__dirname + "/logger");

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

mongoose.connect(conStr,
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        logMsg = "Die Datenbankverbindung wurde hergestellt"
        debuglog(`[${helpers.getTime()}] ${logMsg} `)
        logger.info(logMsg);
    })
    .catch(err => {
        logMsg = "Fehler beim Herstellen der Datenbankverbindung"
        logger.error(logMsg);
        debuglog(`[${helpers.getTime()}] ${logMsg} !!!`);
});


var db = mongoose.connection;
logMsg = "!!! Fehler beim Herstellen der Datenbankverbindung !!!";
db.on("error", console.error.bind(console, logMsg));

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

// Flash wird von Passport benötigt
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

// const User = mongoose.model("User", UserSchema, "User");
const User = require("./models/user")

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

var portNrHttp = process.env.portNrHttp;
var portNrHttps = process.env.portNrHttps;
var portNrHttpExtern = process.env.portNrHttpExtern;
var portNrHttpsExtern = process.env.portNrHttpsExtern;

// Wird immer aufgerufen
app.use((request, response, next) => {
    debuglog(`[${helpers.getTime()}] *** Calling general app.use ***`);
    // Nach einer erfolgreichen Anmeldung soll der aktuelle User abgelegt werden 
    response.locals.currentUser = request.user;
    // request.secure ? next() : response.redirect("https://" + request.headers.host + `:${portNrHttps}` + request.url);
    // Umleiten auf Https außer im Textmodus
    if (process.env.testMode != "yes") {
        if (!request.secure) {
            // var newUrl = "https://" + request.headers.host.replace(`${portNrHttpExtern}`,`${portNrHttpsExtern}`) + request.url;
            var newUrl = `https://${request.hostname}:${portNrHttpsExtern}${request.url}`;
            logMsg = "+++ HTTP-Umleitung nach ${newUrl} +++"
            debuglog(`[${helpers.getTime()}] ${logMsg}`);
            return response.redirect(newUrl);
        }
    }
    next();
});

// ============================================================================
// Die Routen
// ============================================================================

app.use("/", indexRouter);
app.use("/catalog", catalogRouter)

// Allgemeiner Error handler
app.use((err, request, response, next) => {

    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get("env") === "development" ? err : {};
  
    // render the error page
    response.status(err.status || 500);
    response.render("error");
});


if(process.env.testMode == "yes")
{
    portNrHttp = process.env.portNrHttpTest
    app.listen(portNrHttp, () => {
        logMsg = `*** Der OMI-Studi-Helper horcht per HTTP auf Port ${portNrHttp} ***`
        logger.info(logMsg);
        debuglog(`[${helpers.getTime()}] ${logMsg} ***`);
    });
} else {
    app.listen(portNrHttp, () => {
        logMsg = `*** Der OMI-Studi-Helper horcht per HTTP auf Port ${portNrHttp} ***`
        logger.info(logMsg);
        debuglog(`[${helpers.getTime()}] ${logMsg}`);
    });

    var httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, "certs/privkey.pem")),
        cert: fs.readFileSync(path.join(__dirname, "certs/cert.pem"))
    };

    var httpsServer = https.createServer(httpsOptions, app);

    httpsServer.listen(portNrHttps, () => {
        logMsg = "*** Der OMI-Studi-Helper horcht per HTTPS auf Port ${portNrHttps} ***"
        logger.info(logMsg);
        debuglog(`[${helpers.getTime()}] ${logMsg}`);
    });
}