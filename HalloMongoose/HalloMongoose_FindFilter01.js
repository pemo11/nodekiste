// File: HalloMongo_FindFilter01.js
// Erstellt: 03/06/21
// Suche mit einem Filter

const mongoose = require("mongoose");
var conStr = "mongodb://localhost:27017/HalloMongo"

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Titel: {
        type: String,
        trim: true,
    },
    Jahr: String,
});

// Schritt 2: model anlegen
// Groß-/Kleinschreibung spielt beim Collection-Namen keine Rolle, also z.B. Registration oder registration
const titelModel = mongoose.model("musiktitel", titelSchema, "Titel");

var conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(`Upps, es gab nen Error: $(err.message)`);
});

// Wird beim Schließen der Verbindung ausgeführt
db.on("close", () => {
    console.log("*** Verbindung wurde ganz offiziell wieder geschlossen ***");
});

// Wird beim Öffnen der Verbindung ausgeführt
db.on("open", () => {
    console.log("*** Hey, ich bin mit Mongo connected! ***");

    // find()-Aufruf mit filter
    titelModel.find({Jahr: {$gt:"1985"}})
    .then((alleTitel) => {
        alleTitel.forEach((titel, i) => {
            console.log(`Titel=${titel["Titel"]} Interpret=${titel["Interpret"]} Jahr=${titel["Jahr"]}`);
        })
    })
    .then(()=>{
        // Schließen der Verbindung
        mongoose.connection.close()
        .then((err)=> {
            if (err) console.log("Error: " + err)
            else 
                console.log("*** Verbindung wurde wieder gesloten ***");
        });
    })
    .catch((err)=> {
        console.log(`Hhmm, irgendetwas ging jetzt wieder mal saumäßig schief ${err}`);
    });
})


