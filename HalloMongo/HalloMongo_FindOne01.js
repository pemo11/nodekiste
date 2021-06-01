// File: HalloMongo_FindOne01.js
// Erstellt: 01/06/21 - Beispiel für FindOne mit Filter

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

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
    console.log("*** connect-Aufruf abgeschlossen ***");
});

// Schritt 4: Einen Titel per FindOne und Filter finden
var filter = {Interpret:"Udo Lindenberg"};

// Schritt 5: findOne aufrufen und am Ende die Verbindung auch wieder schließen
var titel = titelModel.findOne(filter, (err, result) => {
    if (err) {
        console.log(`!!! Echt unerwarteter Fehler ${err} !!!`); 
    } else {
        console.log(`*** Id: ${result._id} Titel: ${result.Titel} ***`);
    }
})
// Bei diesem then()-Aufruf wird keine err-Parameter übergeben
.then((doc) => {
    db.close((err) => {
        if (err) {
            console.log(`!!! Close - echt unerwarteter Fehler ${err} !!!`); 
        } else {
            console.log(`*** Id: ${doc._id} Titel: ${doc.Titel} ***`);
            console.log("*** Verbindung wurde ordnungsgemäß geschlossen ***");
        }
    });
});

