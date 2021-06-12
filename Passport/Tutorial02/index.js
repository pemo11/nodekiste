// file: index.js

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")

const mongoose = require("mongoose");

var passport = require("passport")
require("./passport/setup");

const auth = require("./routes/auth");

var app = express();

const portNr = 8014;
const conStr = "mongodb://127.0.0.1:27017/loginDb";

mongoose
 .connect(conStr, {useNewUrlParser:true,useUnifiedTopology: true })
 .then(console.log("Db-Connect ok"))
 .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
    session({
        secret:"geheim+123",
        resave:false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: conStr})
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("api/auth", auth);

app.get("/", (request, response) => {
    response.send("Alles klaro!");
});

app.listen(portNr, () => {
    console.log(`*** Der Server lauscht auf Port Nr. ${portNr} ***`);
})