// ============================================================================
// IMG SS 21
// Autor: Peter Monadjemi (7004123)
// Letzte Aktualisierung: 19/06/21
// ============================================================================

// Allgemeine Variablendeklarationen
const express = require("express");
const util = require("util");
const debuglog = util.debuglog("app");
const mongoose = require("mongoose");

require("dotenv").config({path: __dirname + "/.env"});

// ============================================================================
// Datenbank-Initialisierung
// ============================================================================

// ============================================================================
// Express-Initialisierung
// ============================================================================
var app = express();

// ============================================================================
// Die Routen
// ============================================================================

app.get("/", (request, response) => {
    response.send("<H3 style='font-family:verdana'><span style='color:red'>W</span>elcome <span style='color:blue'>to</span> the <span style='color:green'>P</span>leasure<span style='color:magenta'>d</span>ome</H3>");
});

portNr = process.env.portNr;

app.listen(portNr, () => {
    debuglog(`*** Ey gude, der Server horscht heute uff de port ${portNr} ***`);
});








