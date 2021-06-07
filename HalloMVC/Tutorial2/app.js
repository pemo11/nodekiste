// File: app.js
// Erstellt: 03/06/21
// Ein weiteres MVC-Tutorial - https://dev.to/eaetukudo/understanding-mvc-pattern-in-nodejs-2bdn
// Dieses Mal auch mit Tests
// Wichtig: Wegen dotenv kann Projekt nicht per F5 gestartet werden!

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { REPL_MODE_SLOPPY } = require("repl");
var morgan = require("morgan");

const app = express();

require("dotenv").config();

// http-Logging aktivieren
app.use(morgan("dev"));

const portNr = process.env.portNr;

const conStr = process.env.mongoDbConStr;
mongoose.connect(conStr, {useNewUrlParser:true, useUnifiedTopology: true})
 .then(result => console.log(`*** Connection war ein voller Erfolg (${result.version})`))
 .catch(err => console.log(`!!! Fehler beim Connecten ${err} !!!`));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (request, response) => {
//     response.send("<h3>Hallo, hallo!</h3");
// })

var articleRouter = require("./routes/articleRoute");
app.use("/", articleRouter);

app.listen(portNr, () => {
    console.log(`*** Die Anwendung horcht auf Port ${portNr} ***`);
});

