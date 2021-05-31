// File: HalloMongo_FindMitCollectionName
// Erstellt: 01/06/21
// Auflisten aller Dokumente über den Collection-Namen

const mongoose = require("mongoose");
// Beim Db-Namen kommt es auf die Groß-/Kleinschreibung an
const conStr = "mongodb://localhost:27017/MusikDB"

mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("open", (con)=> {
    console.log("*** Die Verbindung steht ***");
    const db = mongoose.connection.db;
    db.Titel.find())> {
        if (err) {
            console.log("!!! Fehler: " + err);
        } else {
            names.forEach((element,i) => {
                console.log("--->", element.name);
            });
        }
        // Wenn die Verbindung geschlossen wurde, endet das Programm auch
        mongoose.connection.close();
        console.log("*** Die Verbindung wurde wieder geschlossen ***");
    })
});