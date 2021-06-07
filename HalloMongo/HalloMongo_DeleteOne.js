// file: HalloMongo_DeleteOne.js
// Erstellt: 05/06/21 - Löschen eines Objekts per DeleteOne

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Titel: {
        type: String,
        trim: true,
    },
});

// Für die spätere Ausgabe aller Titel
function titelAusgabe(m) {
    console.log("*** Ausgabe aller Titel ***");
    // Alle Titel wieder abrufen
    return new Promise(resolve => {
        m.find()
        .then((alleTitel) => {
            console.log(`*** Anzahl Titel: ${alleTitel.length} ***`);
            alleTitel.forEach((titel, i) => {
                console.log(`Interpret=${titel["Interpret"]} Titel=${titel["Titel"]} (${titel["Laenge"]})`);
            });
            // resolve() muss in diesem Block stehen, ansonsten wird das Schließen der Verbindung vor der Ausgabe
            // ausgeführt!
            resolve();
        });
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

// Schritt 4: Jetzt wird ein Titel gelöscht
// geht - gibt es den Titel nicht, gibt es keine Fehlermeldung
titelModel.deleteOne({Titel:"Alles klar auf der Andrea Doria"})
    .then((titel) => {
        // Alle Titel ausgeben
        titelAusgabe(titelModel)
         .then(() => {
            mongoose.connection.close();
            console.log("*** Connection wieder geschlossen ***");
         })
         .catch((err) => {
            console.log("!!! Fehler bei deleteOne " + err.message + "!!!");
        });
});

