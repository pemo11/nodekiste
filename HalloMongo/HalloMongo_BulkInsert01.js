// file: HalloMongoBulkInsert01.js
// Erstellt: 05/06/21 - Einfügen mehrerer Datensätze mit insertMany()

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"
const path = require("path");
const fs = require("fs");
const { strict } = require("assert");

// Schritt 1: Das Schema definieren - dieser Schritt ist obligatorisch
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
    Album: {
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

var maxId = 0;
var jsonPfad = __dirname + "/../Material/MusikDbUpdate.json";

// Schritt 4: Default-Connection über eine Variable ansprechbar machen
const db = mongoose.connection;

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");
})
.then(() =>{
    console.log("*** The next step ***");

    // Schritt 5: Den größten Wert des Id-Feldes holen
    titelModel.countDocuments((err, count) => {
        if (err) console.log("Error: " + err);
        else {
            maxId = count;
            console.log("MaxId=" + maxId);
            fs.readFile(jsonPfad, "utf8", (err, daten) => {
                if (err) console.log("Error: " + err);
                else 
                // Das BOM-Byte muss ggf. entfernt werden
                // daten = daten.substring(1);
                daten = daten[0] == "\uFEFF" ? daten.substring(1) : daten
                var titelListe = JSON.parse(daten);
                // Jetzt alles einfügen
                titelModel.insertMany(titelListe)
                 .then(daten => {
                     console.log("*** Einfügen war offenbar ziemlich erfolgreich ***");
                     console.log(daten);
                     titelAusgabe(titelModel);
                 })
                 .then(() => {
                    mongoose.disconnect();
                 })
                 .catch(err => {
                     console.log("Error bei InsertMany: " + err);
                 });
            });

            });
        }
    });
});





