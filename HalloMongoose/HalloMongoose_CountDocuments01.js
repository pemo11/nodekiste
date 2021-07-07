// File: HalloMongo_FindOne03.js
// Erstellt: 02/06/21 - sehr einfache Implementierung aus dem Internet

const express = require("express");
const mongoose = require("mongoose");
const app = express()
  
// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/MusikDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
  
// Titel model
const Titel = mongoose.model("Titel", { 
    Id: { type: Number },
    Titel: { type: String }
},"Titel");
  
var query = Titel.find();

// Geht, aber count() ist deprecated
query.count(function (err, count) {
    if (err) console.log(err)
    else console.log("Count:", count)
});

var maxId = 0;

// So geht es, aber die Ausgabe muss innerhalb des Callback erfolgen, sonst wird sie vor der Abfrage ausgegeben
Titel.countDocuments((err, count) => {
    if (err) console.log("Error: " + err);
    maxId = count;
    console.log("MaxId=" + maxId);
});

app.listen(3000, function(error ) {
    if(error) console.log(error)
    console.log("Server listening on PORT 3000")
});