// File: HalloMongo_FindOne01.js
// Erstellt: 01/06/21 - Beispiel für Find() mit Callback
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
   console.log("*** Verbindung wurde geöffnet ***");
});

// Schritt 4: Alle Titel per Find finden
var filter = {Jahr:"1984"};
    
// Schritt 5: find aufrufen und am Ende die Verbindung auch wieder schließen
titelModel.find(filter)
.then((alleTitel) => {
    alleTitel.forEach((titel, i) => {
        console.log(`*** Id: ${titel._id} Titel: ${titel.Titel} Interpret: ${titel.Interpret} ***`);
    });
})

// Wirklich genial, dass sich das so schreiben lässt
.then(()=> {
    db.close((err) => {
        if (err) {
            console.log(`!!! Close - echt unerwarteter Fehler ${err} !!!`); 
        } else {
            console.log("*** Verbindung wurde ordnungsgemäß geschlossen ***");
        }
    });
});
