// File: HalloMongo_Save01.js
// Erstellt: 01/06/21
// Hinzufügen eines Datensatzes (Document)

// Update: Nachdem ich eine Nacht darüber geschlafen hatte, hatte ich am nächsten Morgen um 9 Uhr die Lösung
// a) es muss lediglich save() aufgerufen werden
// b) das ursprüngliche Problem war wieder einmal die Reihenfolge
// In diesem Fall soll die Verbindung erst nachdem Abrufen der Titel geschlossen werden
// Das habe ich erreicht, in dem titelAuflisten() ein promise zurückgibt und damit der close() in dem then-Block durchgeführt
// werden kann - gewusst wie;) Ich tue mich damit aber noch schwer, aber ich lerne dazu
// Auf alle Fälle verstehe ich den grundsätzlichen Ablauf besser als im letzten Jahr !

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
// !!! Damit Mongoose nicht einen eigenen Collection-Namen anlegt, muss bei model() der "wahre" Name
// als dritter Parameterwert übergeben werden !!! (das hat mich den halben Montagnachmittag gekostet)
// in diesem Fall spielt der erste Name keine Rolle
var titelModel = mongoose.model("MusikTitel", titelSchema, "Titel");

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");
});

// Schritt 4: Default-Connection über eine Variable ansprechbar machen
const db = mongoose.connection;

// Zwischenschritt - den größten Wert des Id-Feldes holen
const maxId = 26;

// Schritt 5: Neuen Titel über das Model anlegen
titelNeu = new titelModel(
    { Id: maxId,
      Titel: "Alles klar auf der Andrea Doria",
      Album: "Alles klar auf der Andrea Doria",
      Interpret: "Udo Lindenberg",
      Jahr: "1973",
      Kategorie: "Rock",
      Bewertung: "5",
      Laenge: "3,42"}
);

// Schritt 6: Titel in der Datenbank speichern
titelNeu.save((err, titel) => {
    if (err) {
        console.log(`!!! Fehler beim Anlegen eines neuen Titels (${err})`);
    } else {
        console.log(`*** Titel _id=${titel._id} wurde angelegt ***`);
        titelAusgabe(titelModel)
        .then(()=> {
            // Schließen der Verbindung
            db.close();
            console.log("*** Fertig ***");
        });
    }
});

// Was bedeutet der path, der populate() übergeben werden muss???
// Update: Per populate() wird lediglich ein Feld mit dem Wert eines anderen Feldes, auch
// aus einer anderen Collection, belegt - es kommt daher für das Aktualisieren der COllection gar nicht in Frage
// titelNeu.populate("titel", {path:"_id"}).execPopulate();
// Sehr gute Diskussion
// https://stackoverflow.com/questions/13525480/mongoose-populate-after-save

/*
.then(() => {
})
.catch((err)=> {
    console.log(`Hhmm, irgendetwas ging jetzt wieder mal total daneben ${err}`);
    // Schließen der Verbindung auch im Fehlerfall
    db.close();
});
*/