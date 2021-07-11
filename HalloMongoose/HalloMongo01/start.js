// File: start.js

require("dotenv").config();
const mongoose = require("mongoose");
// Registration-Modell ganz am Anfang deklarieren ?
// Auf alle Fälle geht es so und es kommt ein Unbekanntes Schema-Fehler
require("./models/Registration");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
 .on("open", () => {
   console.log("Hey, ich bin mit Mongo connected!");
 })
 .on("error", (err) => {
   console.log(`Upps, es gab nen Error: $(err.message)`);
 });

const app = require("./app");
const portNr = 8082;

const server = app.listen(portNr, () => {
  console.log(`Express is running on port ${server.address().port}`);
});


app.use("/", routes);

