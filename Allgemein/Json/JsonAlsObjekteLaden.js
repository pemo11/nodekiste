// file: JsonAlsObjekteLaden.js
// Erstellt: 05/06/21 - Laden einer Json-Datei und Ausgabe als Objekte

const path = require("path");
const fs = require("fs");

const jsonPfad = __dirname + "/MusikDb.json";

fs.readFile(jsonPfad, "utf8", (err, daten) => {
    if (err) console.log("Error: " + err);
    else 
    // Das BOM-Byte muss ggf. entfernt werden
    // daten = daten.substring(1);
    // Sehr praktisch dank ? und :
    daten = daten[0] == "\uFEFF" ? daten.substring(1) : daten
    var titelListe = JSON.parse(daten);
    titelListe.forEach(titel => {
        console.log(`Interpret: ${titel.Interpret} Titel: ${titel.Titel} Länge: ${titel.Laenge}`);
    });
});


