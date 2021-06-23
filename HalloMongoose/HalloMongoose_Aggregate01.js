// File: HalloMongo_Aggregate01.js
// Erstellt: 22/06/21
// Soll ein Beispiel für die Aggretate-Functions sein und vor allem für await, aber es funktioniert nicht richtig
// await bringt eigentlich nichts, besser ist es, mit then() zu arbeiten
// https://masteringjs.io/tutorials/mongoose/aggregate
// Habe es dann wieder auf then-chains umgestellt - und es funktioniert ;)
// Die Frage wäre aber trotzdem, wie es auf await umgestellt wird, da sich dann alle Aufrufe wie gewohnt
// nacheinander ausführen lassen sollten

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/ST"

// Schritt 1: Schema definieren
const characterSchema = new mongoose.Schema({
    name: String,
    age: Number,
    rank: String
});

// Schritt 2: model anlegen
const Character = mongoose.model("Character", characterSchema);

// Schritt 3: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");

    // Schritt 4: documents anlegen
    Character.create([
        { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { name: 'William Riker', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' },
        { name: 'Wesley Crusher', age: 13, rank: 'Ensign' },
    ])
    .then(() => {
        console.log("*** Characters angelegt ***");

        // Schritt 5: Filter anwenden - ein match ohne weitere Functions ist wie find()
        const filter1 = { age: { $gte: 30 } };
        const filter2 = { age: { $gte: 20 } };
        Character.aggregate([
            { $match: filter2 }
        ])
        .then(result => {
            // Bei Filter1 wird Captain Jean-Luc Picard 21 ausgegeben???
            // Bei Filter2 dagegen alle CrewMitglieder bis auf Wesley aber 19x also 95 Objekte
            // Achso, bei jedem Aufruf wird die Collection größer, daher die vielen Objekte;)
            result.forEach(crewMember => {
                console.log(crewMember.name);
            });
            mongoose.connection.close()
            .then(() => {
                console.log("*** Verbindung wurde wieder geschlossen ***");
            });
        });

    });

});

