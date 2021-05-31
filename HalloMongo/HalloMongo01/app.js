// File: app.js
// Erstellt: 31/05/21
// Umsetzung eines Tutorials https://www.sitepoint.com/build-simple-beginner-app-node-bootstrap-mongodb/onst express = require("express");
const express = require("express");
const routes = require("./routes/index");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");
// Pfad muss per join() absolut gebildet werden 
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);


module.exports = app;
