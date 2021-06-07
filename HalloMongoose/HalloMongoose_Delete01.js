// File: HalloMongo_Delete01.js
// Erstellt: 03/06/21
// Löschene eines zuvor hinzufügten Datensatzes (Document)

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 1: Das Schema definieren - dieser Schritt ist obligatorisch
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
    Album: {
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
})
.then(() =>{
    console.log("*** The next step ***");
});

// Schritt 4: Default-Connection über eine Variable ansprechbar machen
const db = mongoose.connection;

// Zwischenschritt - den größten Wert des Id-Feldes holen
var maxId = 0;

titelModel.countDocuments((err, count) => {
    if (err) console.log("Error: " + err);
    else {
        maxId = count;
        console.log("MaxId=" + maxId);
    }
});

// Schritt 5: Neuen Titel über das Model anlegen z
titelNeu = new titelModel(
    { Id: maxId,
      Titel: "Rocking all over the World",
      Album: "Rockin' all over the World",
      Interpret: "Status Quo",
      Jahr: "1977",
      Kategorie: "Rock",
      Bewertung: "2",
      Laenge: "2,56"}
);

// Schritt 6: Titel in der Datenbank speichern 
titelNeu.save((err, titel) => {
    if (err) {
        console.log(`!!! Fehler beim Anlegen eines neuen Titels (${err})`);
    } else {
        console.log(`*** Titel _id=${titel._id} wurde angelegt ***`);
        titelAusgabe(titelModel)
        // Schließen der Verbindung
        // Problem: Die Ausgabe der Titel erfolgt erst nach dem close, so dass die Reihenfolge nicht stimmt
        //db.close();
        .then(()=> {
            // So gehts, da titelAusgabe() ein Promise zurückgibt, aber die Reihenfolge stimmt immer noch nicht
            // denn jetzt wird der Titel zuerst gelöscht, dann neu angelegt und dann wird alles ausgegeben
            db.close()
            .then(() => {
                // So stimmt die Reihenfolge und die Verbindung wird erst nach der Ausgabe geschlossen
                console.log("*** Verbindung wurde geschlossen ***");
            });
        });
    }
});

// Schritt 7: Jetzt wieder löschen
titelModel.deleteOne({Name:"Status Quo",Titel:"Rocking all over the world"})
.then(()=> {
    console.log(`*** Der schlechte Titel wurde gelöscht ***`);
    console.log("*** Fertig ***");
})
.catch((err)=> {
    console.log(`!!! Fehler beim Löschen des schlechten Titels (${err})`);
});

