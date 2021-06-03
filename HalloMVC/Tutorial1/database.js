// File: database.js

var mongoose = require("mongoose");

const conStr = "mongodb://localhost:27017/NodeApp";

mongoose.connect(conStr, {useNewUrlParser:true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("connected", () => {
    console.log("*** Connected with Mongo forever ***");
});

// Verbindung wird in diesem Beispiel nicht geschlossen
db.on("disconnected", () => {
    console.log("*** Bye, bye- see you next time ***");
});

db.on("error", (err)=> {
    console.log(`!!! Uh,oh - what an error ${err} !!!`);
});

module.exports = db;

