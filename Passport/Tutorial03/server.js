// file: server.js
var express = require("express");
var path = require("path");
var bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config({path: __dirname + "//.env"});

const app = express();
const users = [];
const passport = require("passport");

const initializePassport = require("./passport-config");
const { debuglog } = require("util");
const { env } = require("process");
const logger = debuglog("app");

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),
    logger
);

var portNr = 8016;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
    logger("*** Calling GET / ***");
    request.flash("info", "*** Noch ist nicht viel passiert ***");
    response.render("index", {name:"Pemo"});
});

app.get("/treasure", checkAuthenticated, (request, response) => {
    logger("*** Calling GET-treasure ***");
    response.render("treasure", {});
});

app.get("/login", checkNotAuthenticated, (request, response) => {
    logger("*** Calling GET-Login ***");
    response.render("login");
});

app.post("/login", checkNotAuthenticated,
    passport.authenticate("local", {
     successRedirect: "/",
     failureRedirect: "/login",
     failureFlash: true,
    }),
    (request, response) => {
        logger("*** Calling POST-Login ***");
});


app.get("/register", checkNotAuthenticated,
    (request, response) => {
    logger("*** Calling GET-Register ***");
    response.render("register");
});

app.post("/register", checkNotAuthenticated, async (request, response) => {
    logger(`*** Calling POST-Register mit password=${request.body.password} ***`);
    try {
        const hashpw = await bcrypt.hash(request.body.password, 10);
        logger(`*** Pw=${hashpw} ***`);
        users.push({
            id: Date.now().toString(),
            name: request.body.name,
            email: request.body.email,
            password: hashpw
            });
            logger("*** Der User wurde angelegt ***");
            console.log(users);
            response.redirect("/login");
    } catch (err) {
        logger("Fehler beim Registrieren: " + err);
        response.redirect("/register");
    }
});

app.delete("/logout", (request, response) => {
    request.logOut()
    response.redirect("/login")
  });

function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
  
    response.redirect("/login");
}

function checkNotAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        response.redirect("/");
    }
    return next();
}

app.listen(portNr, ()=> {
    console.log(`*** Server horcht auf Port ${portNr} ***`);
});