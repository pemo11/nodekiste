// File: HalloMongo04.js
// Erstellt: 01/06/21
// Abfrage einer vorhandenen Datenbank - verzögerte Ausführung
// Dieses Beispiel verwendet die MusikDb-Datenbank

const mongoose = require("mongoose");
var conStr = "mongodb://localhost:27017/MusikDb"

// Schritt 1: Schema definieren
const TitelSchema = new mongoose.Schema({
    titel: {
        type: String,
        trim: true,
    },
    interpret: {
        type: String,
        trim: true,
    },
    jahr: {
        type: String,
    },
    kategorie: {
        type: String,
        trim: true,
    },
    bewertung: {
        type: String,
    },
    laenge: {
        type: String,
    }
});

// Schritt 2: model anlegen
const titelModel = mongoose.model("titel", TitelSchema);

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(`Upps, es gab nen kleinen Error: $(err.message)`);
});

// Wird beim Schließen der Verbindung ausgeführt
db.on("close", () => {
    console.log("*** Verbindung wurde wieder geschlossen ***");
});

// Wird beim Öffnen der Verbindung ausgeführt
db.on("open", () => {
    console.log("*** Hey, ich bin mit Mongo connected! ***");

    // find()-Aufruf mit then
    const query = titelModel.find({});

    query.select("titel interpret jahr");

    // Maximal 3 Elemente
    // query.limit(3);

    query.exec((err, alleTitel) => {
        console.log(alleTitel)
        if (err) {
            console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
        } else {
            alleTitel.forEach((titel, i) => {
                console.log(`Titel=${titel["titel"]} Interpret=${titel["interpret"]} Jahr=${titel["kategorie"]}`);
            }); 
        }
    });
});