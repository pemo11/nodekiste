// file: app.js
const express = require("express");
const path = require("path");
const util = require("util");
var debuglog = util.debuglog("app");

// bodyParser is deprecated
// const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan")("dev");
// warum cors?
const cors = require("cors");

// const errorHandler = require("errorhandler");

// app einrichten

const app = express();
app.use(cors());
app.use(morgan);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "geheim+123",
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));

// app.use(errorHandler);

// mongoose einrichten
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const conStr = "mongodb://localhorst:27017/Tut7";

mongoose.connect(conStr, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    debuglog("*** Verbindung steht, alles roger ***");
})
// Es kommt nie zu einem Fehler, wenn conStr nicht stimmt
.catch(err => {
    debuglog(`!!! Keine Verbindung zur Datenbank ${err} !!!`);
});

  
app.use((err, request, response) => {
    debuglog("*** Allgemeiner app.use call ***");
    response.status(err.status || 500);

    response.json({
        errors: {
            message: err.message, error: err
        },
    })
});

portNr = 8034;

app.listen(portNr, () => {
    debuglog(`*** Unser Server horcht heute auf Port ${portNr} ***`);
})