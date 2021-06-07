// File: HalloMongo01.js
// Erstellt: 01/06/21
// Abfrage einer vorhandenen Datenbank - das absolute Minimum - Beispiel funktioniert

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 1: Schema definieren
// Datentyp muss passen, sonst gibt es später beim Abfruf keinen Wert
// Durch den JSON-Import sind alle Datentypen string, bei Laenge müsste es Number sein
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

// Schritt 2: model anlegen
// !!! Damit Mongoose nicht einen eigenen Collection-Namen anlegt, muss bei model() der "wahre" Name
// als dritter Parameterwert übergeben werden !!! (das hat mich den halben Montagnachmittag gekostet)
// in diesem Fall spielt der erste Name keine Rolle
const titelModel = mongoose.model("xxx", titelSchema, "Titel");

// Schritt 3: Verbindung herstellen
// Stimmt der DB-Name nicht, wird kein Fehler ausgelöst???
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");
});

// connection ist die Default-Connection
// Jede weitere Verbindung muss über createConnection() angelegt werden
const db = mongoose.connection;

// find()-Aufruf mit then
titelModel.find()
.then((alleTitel) => {
    console.log(`*** Anzahl Titel: ${alleTitel.length} ***`);
    alleTitel.forEach((titel, i) => {
        console.log(`Interpret=${titel["Interpret"]} Titel=${titel["Titel"]} (${titel["Laenge"]})`);
    });
})
.then(() => {
    // Schließen der Verbindung
    db.close();
    console.log("*** Fertig ***");
})
.catch((err)=> {
    console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
    // Schließen der Verbindung auch im Fehlerfall
    db.close();
});
