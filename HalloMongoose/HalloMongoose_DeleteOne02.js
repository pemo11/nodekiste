// file: HalloMongo_DeleteOne02.js
// Erstellt: 28/06/21 - Löschen eines Objekts per DeleteOne und Id
// Nur ohne die MusikDB getestet
// Idee: MusikDB nach Atlas übertragen, so dass sie immer zur Verfügung steht
const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/MusikDB"

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Titel: {
        type: String,
        trim: true,
    },
});

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

titelModel.find({Titel:"Alles klar auf der Andrea Doria"})
 .then((titel) => {
     if (titel.length > 0) {
        console.log(`*** Der Diddel ${titel[0]} wurde gefunden ****`);
        titelModel.findOneAndDelete({_id:titel[0]._id})
         .then(() => {
             console.log(`*** Der Diddel ${titel[0]} wurde gelöscht ****`);
             mongoose.connection.close();
             console.log("*** Connection wieder geschlossen ***");
        })
        .catch(err => {
            console.log("!!! Fehler bei FindOneAndDelete " + err.message + "!!!");
            mongoose.connection.close();
            console.log("*** Connection wieder geschlossen ***");
       })
     } else {
         console.log("!!! Den Diddel gibt es net ?!?")
     }
 })
 .catch(err => {
    console.log("!!! Fehler bei Find " + err.message + "!!!");
    mongoose.connection.close();
    console.log("*** Connection wieder geschlossen ***");
});

