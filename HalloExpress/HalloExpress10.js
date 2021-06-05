// file: HalloExpress10.js
// Soll in erster Linie den Ablauf bei der Pipeline deutlich machen
// Erstelt: 03/06/21

var express = require("express");
var app = express();
var path = require("path");

app.set("view engine","pug");
app.set("views", __dirname + "/views");

// Setzen des statischen Verzeichnisses für Express
app.use(express.static(__dirname+ "/public"));

var portNr = 8006;

app.use((request, response,next)=> {
    console.log("*** Die Middleware ist dran ****");
    // Aufruf erforderlich?
    next();
});

app.get("/", (request, response) => {
    console.log("*** Aufruf von / ***");
    response.render("index10", {title:"Hello, Express Nr. 10"});
});

app.get("/user", (request, response)=> {
    console.log("*** Aufruf von /user ***");
    var users = [];
    users.push({name:"The Pemo",profession:"Pro Wrestler"});
    users.push({name:"SusiQ",profession:"Pole dancer"});
    users.push({name:"Hermit",profession:"Eremit"});
    response.render("user10",{title:"Hello, Express Nr. 10", data:users});
});

app.listen(portNr, (err)=> {
    if (err) console.log(err);
    console.log(`*** Der Server horcht auf Port ${portNr} `);
});


