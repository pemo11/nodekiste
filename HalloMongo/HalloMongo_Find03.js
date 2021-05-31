// File: HalloMongo03.js
// Erstellt: 01/06/21
// Abfrage einer vorhandenen Datenbank - wie Beispiel Nr. 1 nur etwas geradelinieger

const mongoose = require("mongoose");
var conStr = "mongodb://localhost:27017/HalloMongo"

// Schritt 1: Schema definieren
const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
});

// Schritt 2: model anlegen
const model = mongoose.model("Registration", registrationSchema);

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
    console.log("*** Verbindung wurde wieder geschlossen ***");
});

// Wird beim Öffnen der Verbindung ausgeführt
db.on("open", () => {
    console.log("*** Hey, ich bin mit Mongo connected! ***");

    // find()-Aufruf mit then
    model.find()
    .then((registrations) => {
        registrations.forEach((registration, i) => {
            console.log(`Name=${registration["name"]} EMail=${registration["email"]}`);
        })
    })
    .then(()=>{
        // Schließen der Verbindung
        mongoose.connection.close();
    })
    .catch((err)=> {
        console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
    });
})


