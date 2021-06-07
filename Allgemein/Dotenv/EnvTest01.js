// File: EnvTest01.js

const path = require("path");

// Dieser Pfad bezieht auf das Stammverzeichnis, z.B. Nodekiste
// var env = require("dotenv").config();

// Seltsam - Modul wird geladen, aber der Inhalt kann nicht gelesen werden?
// require("dotenv").config({path:"./.env"});
// Es kommt auf die Pfadschreibweise an! - so geht es 
// var env = require("dotenv").config({path:"G:\\Nodekiste\\Allgemein\\Dotenv\\.env", debug: true });
// So geht es nicht!
// var env = require("dotenv").config({path:"\\.env"});
// So geht es! - das ist dann die offizielle Version
var env = require("dotenv").config({path: __dirname + "//.env"});

//require("dotenv").config({debug: process.env.Wert1});

var Wert1 = process.env.Wert1;
var Pfad = process.env.Pfad;

// Das geht immer
console.log(`Username= ${process.env.Username}`);

console.log(`Wert1= ${Wert1}`);
console.log(`Pfad= ${Pfad}`);