// File: HalloMongo_Aggregate03.js
// Erstellt: 24/06/21
// Wie in IMGS21

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
        { name: 'William Riker', age: 31, rank: 'Commander' },
        { name: 'William Riker 2', age: 29, rank: 'Commander' },
        { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
        { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
        { name: 'Worf', age: 24, rank: 'Lieutenant' },
        { name: 'Wesley Crusher', age: 13, rank: 'Ensign' },
    ])
    .then(() => {
        Character.countDocuments((err, docCount) => {
            console.log(`*** Collection mit ${docCount} Characters angelegt ***`);
        });
 
        // Schritt 5: Verwenden der Aggregate-Pipeline
        const filterAge20 = { age: { $gte: 20 } };
        Character.aggregate([
            {$sort: {age: -1}},
            {$limit: 3},
            {$project: {name:1, rank:1, age:1}},
            ])
        .then(result => {
            result.forEach(crewMen => {
                console.log(`**** ${crewMen.name} Rank ${crewMen.rank} Age: ${crewMen.age}  ***`);
            });
            mongoose.connection.close()
            .then(() => {
                console.log("*** Verbindung wurde wieder geschlossen ***");
            });
        });

    });

});

