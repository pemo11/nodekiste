// File: HalloMongo_FindOne01.js
// Erstellt: 01/06/21 - Beispiel für FindOne mit Filter und exec()

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Nur optional und hilft auch nicht, den await-Fehler abzufangen
process.on("uncaughtException", err => {
    console.error("Es gab einen nicht behandelten Fehler", err)
    process.exit(-1) //mandatory (as per the Node.js docs)
});

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Id: String,
    Titel: {
        type: String,
        trim: true,
    },
    Album: {
        type: String,
        trim: true,
    },
    Interpret: {
        type: String,
        trim: true,
    },
    Jahr: String,
    Kategorie: {
        type: String,
        trim: true,
    },
    Bewertung: String,
    Laenge: String,
});

// Schritt 2: model ableiten
var titelModel = mongoose.model("MusikTitel", titelSchema, "Titel");

// Schritt 2A: Verbindung vereinfachen
const db = mongoose.connection;

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   console.log("*** Verbindung wurde geöffnet ***");
});

// Schritt 4: Einen Titel per FindOne und Filter finden
var filter = {Interpret:"Udo Lindenberg"};
    
// Schritt 5: findOne aufrufen und am Ende die Verbindung auch wieder schließen

throw "!!! Hilfeee !!!";

// Löst aktuell eine uncaught exception aus, die sich nicht abfangen lässt???
// const titel = await titelModel.findOne(filter).exec();

// console.log(`*** Id: ${titel._id} Titel: ${titel.Titel} ***`);

db.close((err) => {
    if (err) {
        console.log(`!!! Close - echt unerwarteter Fehler ${err} !!!`); 
    } else {
        console.log("*** Verbindung wurde ordnungsgemäß geschlossen ***");
    }
});