// File: HalloMongo_Aggregate02.js
// Erstellt: 23/06/21
// Dieses Mal mit Gruppierung

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
            { $match: filterAge20 },
            { $group: {
                _id: "$rank",
                count: {$sum: 1}
                }
            },
            {$sort: {count: -1}}
        ])
        .then(result => {
            result.forEach(rankGroup => {
                console.log(`**** Rank ${rankGroup._id} mit ${rankGroup.count} Mitglieder ***`);
            });
            mongoose.connection.close()
            .then(() => {
                console.log("*** Verbindung wurde wieder geschlossen ***");
            });
        });

    });

});

