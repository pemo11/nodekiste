// File: HalloMongo_FindMitCollectionName
// Erstellt: 01/06/21
// Auflisten aller Dokumente über den Collection-Namen
// !!! Beispiel geht noch nicht !!!

const mongoose = require("mongoose");
// Beim Db-Namen kommt es auf die Groß-/Kleinschreibung an
const conStr = "mongodb://localhost:27017/MusikDB"

mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Auf das Öffnen der Verbindung reagieren
mongoose.connection.on("open", (con)=> {
    console.log("*** Die Verbindung steht ***");
    const db = mongoose.connection.db;
    db.Titel.find()
    .then((alleTitel) => {
        alleTitel.forEach((titel) => {
            console.log("--->", titel.name);
        });
    })
    .catch((err) => {
        if (err) {
            console.log("!!! Fehler: " + err);
        };
    })
    .then(()=> {
    // Wenn die Verbindung geschlossen wurde, endet das Programm auch
        mongoose.connection.close();
        console.log("*** Die Verbindung wurde wieder geschlossen ***");
    })
});