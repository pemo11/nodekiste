// File: HalloMongo01.js
// Erstellt: 01/06/21
// Abfrage einer vorhandenen Datenbank MusikDB - Beispiel funktioniert

const mongoose = require("mongoose");

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

// Groß-/Kleinschreibung spielt beim Collection-Namen keine Rolle, also z.B. Registration oder registration
const titelModel = mongoose.model("musiktitel", titelSchema, "Titel");

var conStr = "mongodb://localhost:27017/MusikDB"

mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
mongoose.connection
.on("open", () => {
    console.log("Hey, ich bin mit Mongo connected!");
})
.on("error", (err) => {
    console.log(`Upps, es gab nen Error: $(err.message)`);
});

// Variante 1: find()-Aufruf und then
titelModel.find()
.then((alleTitel) => {
    alleTitel.forEach((titel, i) => {
        console.log("+++ Variante 1 +++");
        console.log(`Titel=${titel["Titel"]} Interpret=${titel["Interpret"]}`);
    });
    // Schließen der Verbindung
    // mongoose.connection.close();
    })
.catch((err)=> {
    console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
});

// Variante 2: find mit Callback und Projection - alle holen, aber nur Titel als Feld zurückgeben
titelModel.find({},"Titel", (err, result) => {
    if (err) {
        console.log("!!! Fehler: " + err);
    } else {
        result.forEach((titel) => {
            console.log("+++ Variante 2 +++");
            console.log(`Titel=${titel["Titel"]} Interpret=${titel["Interpret"]}`);
        });
    }
})

// Variante 3: find mit Parametern
titelModel.find({Kategorie: "Pop"}, (err, result) => {
    if (err) {
        console.log("!!! Fehler: " + err);
    } else {
        console.log(result);
        result.forEach((titel) => {
            console.log("+++ Variante 3 +++");
            console.log(`Titel=${titel["Titel"]} Interpret=${titel["Interpret"]}`);
        });
    }
    // Schließen der Verbindung
    mongoose.connection.close();
});

// Schließen der Verbindung an dieser Stelle falsch, da sie vor (!) der Abfrage ausgeführt wird
// mongoose.connection.close();

