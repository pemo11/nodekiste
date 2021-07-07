// File: HalloMongoose_FindOne03.js1
// Erstellt: 03/07/21 - FindOne mit then und catch

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

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   console.log("*** Verbindung wurde geöffnet ***");
});

// Schritt 4: Einen Titel per FindOne und Filter finden
var filter = {Interpret: "Udo Lindenberg"};

// Schritt 5: findOne aufrufen und am Ende die Verbindung auch wieder schließen
titelModel.findOne(filter)
.then(titel => {
    if (titel) {
        console.log(`*** Id: ${titel._id} Titel: ${titel.Titel} ***`);
    } else {
        console.log("*** Leider nichts gefunden ****");
    }
    mongoose.connection.close();
    console.log("*** Verbindung wurde geschlossen ***");
})
.catch(err => {
    console.log(`!!! Es trat ein Fehler auf ${err.message} !!!`)
})

