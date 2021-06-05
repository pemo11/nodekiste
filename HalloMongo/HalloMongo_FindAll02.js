// File: HalloMongo_FindOne01.js
// Erstellt: 01/06/21 - Beispiel für Find() mit Filter und exec()
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

// await muss direkt Teild er Function sein 
// ist es Teil des Promise geht es nicht
// wie praktisch Promises auf einmal sind;)
// Damit der close() immer nach (!) dem find ausgeführt wird, muss es so gemacht werden
async function findTitel(filter)
{
    const alleTitel = await titelModel.find(filter).exec();
    alleTitel.forEach((titel, i) => {
        console.log(`*** Id: ${titel._id} Titel: ${titel.Titel} Interpret: ${titel.Interpret} ***`);
    });
    return new Promise((resolve)=> {
        resolve();
    });
}

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
   console.log("*** Verbindung wurde geöffnet ***");
});

// Schritt 4: Alle Titel per Find finden
var filter = {Jahr:"1984"};
    
// Schritt 5: findOne aufrufen und am Ende die Verbindung auch wieder schließen

// Löst aktuell eine uncaught exception aus, die sich nicht abfangen lässt???
// Beim direkten Ausführen per node ergab sich die folgende Fehlermeldung
//  await is only valid in async functions and the top level bodies of modules
// daher:
findTitel(filter)
.then(()=> {
    db.close((err) => {
        if (err) {
            console.log(`!!! Close - echt unerwarteter Fehler ${err} !!!`); 
        } else {
            console.log("*** Verbindung wurde ordnungsgemäß geschlossen ***");
        }
    });
});
