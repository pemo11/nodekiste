// file: PassportAuthenticate2.js
// Erstellt: 26/06/21
// 27/06/21 - grundsätlich geht es, aber request.isAuthenticated() liefert immer false, so dass es doch nicht geht
// ich vermute, dass es etwas mit der Session zu tun hat?
// Wie Beispiel PassportAuthenticate1.js, nur dass Login und Register über pug forms möglich ist
// Bei dem funktionierenden Beispiel tutorial4 gibt es keine sessions-Collection in der Datenbank?

const express = require("express");
const app = express();
const path = require("path");
// const session = require("express-session");

const cryptoHelper = require(__dirname + "/cryptoHelper");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(path.join(__dirname, "public")));

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const conStr = "mongodb://localhost:27017/Passport2";

// process.env.DB_STRING
const connection = mongoose.createConnection(conStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Creates simple schema for a User.
// The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
});

// In serialize user you decide what to store in the session. Here I'm storing the user id only.
passport.serializeUser((user, cbDone) => { 
    console.log(`*** Calling passport->serializeUser with user=${user.username}`);
    cbDone(null, user.id);
});

// Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
passport.deserializeUser((id, cbDone) => {
    console.log(`*** Calling passport->deserizalizeUser with id=${id}`);
    // User müsste per id lokalisiert werden
    User.findById(id, (err, user) => {
        if (err) { return cbDone(err); } 
        cbDone(null, user);
    });
});

const User = connection.model("User", UserSchema);

function checkAuthenticated(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect("/login");
    }
}

const expressSession = require("express-session")({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: false,
    cookie:{
        sameSite: true,
        maxAge: 2*60*1000,
    },   
    store: MongoStore.create({mongoUrl: conStr}),
});

// to make passport remember the user on other pages too.(Read about session store. I used express-sessions.)
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession);

passport.use(new LocalStrategy((username, password, cbDone) => {
    console.log(`*** Calling passport with user=${username}`);
    User.findOne({username: username})
    .then(user => {
        if (!user) {
            return cbDone(null, false);
        }
        var isValid = cryptoHelper.validatePassword(password, user.password, user.salt);
        if (isValid) {
            return cbDone(null, user);
        } else {
            return cbDone(null, false);
        }
    })
    .catch(err => {
        cbDone(err);
    });
}));


app.get("/", (request, response, next) => {
    console.log("*** Calling the / get route ***");
    response.render("index", {isAuthenticated:request.isAuthenticated()});
});

app.get("/users",
    checkAuthenticated,
    (request, response, next) => {
    console.log("*** Calling the users get route ***");
    response.render("users");
});

app.get("/error", (request, response) => {
    console.log("*** Calling the error get route ***");
    response.render("error");
});

app.get("/login", (request, response, next) => {
    console.log("*** Calling the login get route ***");
    response.render("login");
});

// Wenn successRedirect verwendet wird, geht es danach nicht weiter, d.h. der Callback wird nicht ausgeführt!
app.post("/login",
    passport.authenticate("local", { 
        successRedirect: "/",
        failureRedirect: "/error"}),
    (request, response, next) => {
        console.log("*** Calling the successfull login post route ***");
        response.redirect("/");
    }
);

app.get("/register", (request, response, next) => {
    console.log("*** Calling the register get route ***");
    response.render("register");
});

app.post("/register",
    (request, response, next) => {
    // if (err) {next(err)}
    console.log("*** Calling the register post route ***");
    const saltHash = cryptoHelper.generatePassword(request.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const newUser = new User({
        username: request.body.username,
        password: hash,
        salt: salt,
     });
     newUser.save()
     .then((user) => {
         console.log(user);
     })
    .catch(err => {
        next(err);
    });
    response.redirect("/login");
});

portNr = 8028;
app.listen(portNr, () => {
    console.log(`*** Server ist ready auf Port ${portNr} ***`);
});