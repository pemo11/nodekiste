// File: HalloMongo_Update01.js
// Erstellt: 01/06/21
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

// Schritt 3A: Neuerdings erforderlich!
mongoose.set("useFindAndModify", false);

// Schritt 4: Default-Connection über eine Variable ansprechbar machen
const db = mongoose.connection;

// Schritt 5: Ein Document auswählen
const id = "60b5db4edd9ee74a04eb9f3d"

titelModel.findByIdAndUpdate(id, 
    {Bewertung:"2"}, (err, titel) => {
    if (err) {
        console.log("Error: " + err);
    } else {
        // Titel ist das nicht aktualisierte Objekt
        console.log("Aktualisierung erfolgreisch " + titel);
        db.close();
    }
});