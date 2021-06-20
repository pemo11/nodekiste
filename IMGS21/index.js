// ============================================================================
// IMG SS 21
// Autor: Peter Monadjemi (7004123)
// Letzte Aktualisierung: 19/06/21
// ============================================================================

// Allgemeine Deklarationen

const express = require("express");
const app = express();
const util = require("util");
const debuglog = util.debuglog("app");
const path = require("path");
const cookieParser = require("cookie-Parser");

require("dotenv").config({path: __dirname + "/.env"});

var indexRouter = require("./routes/index");
var catalogRouter = require("./routes/catalog");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// ============================================================================
// Datenbank-Initialisierung
// ============================================================================
const mongoose = require("mongoose");
var conStr = process.env.dbCon;
mongoose.connect(conStr, {useNewUrlParser:true, useUnifiedTopology:true});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "!!! Fehler beim Herstellen der Datenbankverbindung !!!"));

// ============================================================================
// Express-Initialisierung
// ============================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
  

portNr = process.env.portNr;

app.listen(portNr, () => {
    debuglog(`*** Ey gude, der Server horscht heute uff de port ${portNr} ***`);
});








