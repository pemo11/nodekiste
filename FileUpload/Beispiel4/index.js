// file: index.js
// erstellt: 09/07/21
// ein weiteres Beispiel mit Mulder, dieses Mal mit einer Controller-Klasse
// https://stackoverflow.com/questions/58474765/how-to-call-multer-middleware-inside-a-controller-in-nodejs
// Bespiel funktioert sehr gut, es ist also doch nicht so kompliziert wie ich dachte bzw. wie es der SO-Post suggeriert
var express = require("express")
var mongoose = require("mongoose");
var path = require("path");
var app = express();
var env = require("dotenv").config({path: __dirname + "//.env"});

var indexRouter = require("./routes/mainRoute");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.dbConstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Hey, ich bin ganz entspannt mit Mongo connected!");
})
.catch(err => {
    console.log(`Upps, es gab nen mongomässigen Error: $(err.message)`);
})

app.use("/", indexRouter);

var portNr = process.env.portNr;

app.listen(portNr, () => {
    console.log(`**** Der Server lauscht ganz gespannt auf PortNr ${portNr} ***`)
});

