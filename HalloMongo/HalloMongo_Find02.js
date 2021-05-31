// File: HalloMongo01.js
// Erstellt: 01/06/21
// Abfrage einer vorhandenen Datenbank

const mongoose = require("mongoose");

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

// Groß-/Kleinschreibung spielt beim Collection-Namen keine Rolle, also z.B. Registration oder registration
const Registration = mongoose.model("Registration", registrationSchema);

var conStr = "mongodb://localhost:27017/HalloMongo"

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
Registration.find()
.then((registrations) => {
    registrations.forEach((registration, i) => {
        console.log("+++ Variante 1 +++");
        console.log(`Name=${registration["name"]} EMail=${registration["email"]}`);
    });
    // Schließen der Verbindung
    // mongoose.connection.close();
    })
.catch((err)=> {
    console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
});

// Variante 2: find mit Callback und Projection - alle holen, aber nur name als Feld zurückgeben
Registration.find({},"name", (err, result) => {
    if (err) {
        console.log("!!! Fehler: " + err);
    } else {
        result.forEach((registration, i) => {
            console.log("+++ Variante 2 +++");
            console.log(`Name=${registration["name"]} EMail=${registration["email"]}`);
        });
    }
})

// Variante 3: find mit Parametern
Registration.find({name: "Peter Monadjemi"}, (err, result) => {
    if (err) {
        console.log("!!! Fehler: " + err);
    } else {
        console.log(result);
        result.forEach((registration, i) => {
            console.log("+++ Variante 3 +++");
            console.log(`Name=${registration["name"]} EMail=${registration["email"]}`);
        });
    }
    // Schließen der Verbindung
    mongoose.connection.close();
});

// Schließen der Verbindung an dieser Stelle falsch, da sie vor (!) der Abfrage ausgeführt wird
// mongoose.connection.close();

