// File: HalloMongo_Aggregate04.js
// Erstellt: 24/06/21
// Muss noch umgesetzt werden - das Schema erhält eine virtual Property, die per Aggregate ebenfalls abfragbar sein soll

const mongoose = require("mongoose");
const conStr = "mongodb://localhost:27017/ST"

// Schritt 1: Schema definieren
const characterSchema = new mongoose.Schema({
    name: String,
    age: Number,
    rank: String
});

// Schritt 2: Schema erweitern
characterSchema
 .virtual("SFCUID")
 .get(function() {
     return `Starfleet-Command Universial Identifier ${this._id}`;
});

// Schritt 3: model anlegen
const Character = mongoose.model("Character", characterSchema);

// Schritt 4: Verbindung herstellen
mongoose.connect(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("*** connect-Aufruf abgeschlossen ***");

    // Schritt 5: Ein paar documents anlegen
    Character.create([
        { id: 1, name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
        { id: 2, name: 'William Riker', age: 31, rank: 'Commander' },
        { id: 3, name: 'William Riker 2', age: 29, rank: 'Commander' },
        { id: 4, name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { id: 5, name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { id: 6, name: 'Worf', age: 24, rank: 'Lieutenant' },
        { id: 7, name: 'Wesley Crusher', age: 13, rank: 'Ensign' },
    ])
    .then(() => {
        Character.countDocuments((err, docCount) => {
            console.log(`*** Collection mit ${docCount} Characters angelegt ***`);
        });
 
        // Schritt 6: Verwenden der Aggregate-Pipeline
        const filterAge20 = { age: { $gte: 20 } };
        Character.aggregate([
            {$sort: {age: -1}},
            {$limit: 3},
            {$project: {name:1, rank:1, age:1, SFCUIDX: "$_id"}},
            ])
        .then(result => {
            result.forEach(crewMan => {
                console.log(`**** ${crewMan.name} SFCUID: ${crewMan.SFCUIDX}  ***`);
            });
            mongoose.connection.close()
            .then(() => {
                console.log("*** Verbindung wurde wieder geschlossen ***");
            });
        });

    });

});

