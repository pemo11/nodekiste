// File: HalloMongo_UpdateOne01.js
// Erstellt: 04/06/21
// Aktualisieren eines Datensatzes (Document)

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Id: String,
    Titel: {
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

// Für die spätere Ausgabe aller Titel
function titelAusgabe(m) {
    // Alle Titel wieder abrufen
    return new Promise(resolve => {
        m.find()
        .then((alleTitel) => {
            console.log(`*** Anzahl Titel: ${alleTitel.length} ***`);
            alleTitel.forEach((titel, i) => {
                console.log(`Interpret=${titel["Interpret"]} Titel=${titel["Titel"]} (${titel["Laenge"]})`);
            });
        });
        resolve();
    });
}

// Schritt 2: model anlegen
var titelModel = mongoose.model("MusikTitel", titelSchema, "Titel");

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");
});

// Schritt 4: Default-Connection über eine Variable ansprechbar machen
const db = mongoose.connection;

// Schritt 5: Ein Document auswählen

// Geht...

titelModel.updateOne({Titel:"Alles klar auf der Andrea Doria"}, 
{Bewertung: "4"}, (err, titel) => {
    if (err) console.log("Fehler bei UpdateOne:" + err);
    else
        console.log("UpdateOne: " + titel.Bewertung);
        db.close();
});

