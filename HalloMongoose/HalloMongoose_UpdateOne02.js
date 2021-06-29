// File: HalloMongo_UpdateOne02.js
// Erstellt: 04/06/21
// Aktualisieren per Increment

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/TestDB"

// Schritt 1: Schema definieren
const titelSchema = new mongoose.Schema({
    Titel: String,
    Bewertung: Number,
});

// Für die spätere Ausgabe aller Titel
function titelAusgabe(m) {
    // Alle Titel wieder abrufen
    return new Promise(resolve => {
        m.find()
        .then((alleTitel) => {
            console.log(`*** Anzahl Titel: ${alleTitel.length} ***`);
            alleTitel.forEach((titel, i) => {
                console.log(`Titel=${titel["Titel"]} (${titel["bewertung"]})`);
            });
        });
        resolve();
    });
}

// Schritt 2: model anlegen
var titelModel = mongoose.model("Titel", titelSchema, "Titel");

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");
});

var db = mongoose.connection;

// Schritt 4: Ein paar Titel einfügen
var titelNeu = new titelModel({
    Titel: "Alles klaro",
    Bewertung: 1
});

async function f1() { await titelModel.create({Titel: "Tuwas2", Bewertung: 1})}
var filter = { Titel: "TuWas"};
var update = { $set: {$inc: {Bewertung: 1 }}};
// new oder returnNewDocument?
// https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
var options = { new: true};

// mit return?
async function f2() { return await titelModel.findOneAndUpdate(filter, update, options)}

f1()
titelUpdate = f2()
console.log(`Titel=${titelUpdate.titel} Bewertung=${titelUpdate.Bewertung}`)

// PM: 29/06/21 - Aktualiesierung funktoniert einfach nicht - in beiden Varianten
// Auch new: true spielt keine Rolle, dann wäre titel2 das aktualisierte Dokument
// $inc geht - der Fehler war (eigentlich klar), dass die Filter-Bedingung nicht erfüllt war und der Grund
// war, dass es _id und nicht id heißen muss
// new geht auch => dann gibt then das aktualisierte Document-Objekt zurück
titelNeu.save()
.then((titel) => {
    console.log(`*** Der Diddel mit Id = ${titel.id} wurde angelegt ***`)
    titelModel.findOneAndUpdate(
        // { _id: titel.id},
        { _id: "60dae296179ed00b26954a11"},
        { $inc: {Bewertung: 1}},
        { new: true})
        .then((titelNeu) => {
            console.log(`*** Ein Like mehr für Titel ${titelNeu.id} (${titelNeu.Bewertung}) ***`);
            db.close();
        })
        .catch(err => {
            console.log(`!!! Fehler beim Updaten von ${err.message} !!!`);
            db.close();
        });
});


