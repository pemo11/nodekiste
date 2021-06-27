// file: PassportAuthenticate1.js
// erstellt: 15/06/21

// Das Beispiel geht einfach nicht, ich verstehe immer noch nicht, wie passport funktioniert
// Der Post-Aufruf ist zwar möglich, aber dann wird nur die error-Route aufgerufen - mehr nicht, echt frustrierend!
// 28/06/21 - es stellt sich heraus, dass es lediglich an express.urlencode(...), also an dem fehlenden BodyParser
// dadurch hatte ein Post keine Wirkung
// Ein weiterer Fehler war, der zu einem Cannot POST Login Fehler führte war, dass in dem grundsätzlich sehr guten Artikel
// offenbar ein Fehler war:
// Der Callback in app.post("/login") war mit (err, req, res, next) => { offenbar falsch, da es keinen err-Parameter gibt
// als ich err weggenommen hatte, ging es und Authentifizierung per passport local ist wirklich nicht so schwer;)
// Auf der anderen Seite war der err-Parameter nicht grundlos dabei, irgendeinen Grund für ihn wird es daher geben - who knows?

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var user = {
    id: 1000,
    username: "pemo",
    password: "pemo"
};

// In serialize user you decide what to store in the session. Here I'm storing the user id only.
passport.serializeUser((user, doneCb) => { 
    console.log(`*** Calling passport->serizialeUser with user=${user.username}`);
    doneCb(null, user.id);
});

// Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
passport.deserializeUser((id, doneCb) => {
    console.log(`*** Calling passport->deserizalizeUser with id=${id}`);
    // User müsste per id lokalisiert werden
    doneCb(null, user);
});

passport.use(new LocalStrategy((username, password, doneCb) => {
    console.log(`*** Calling passport with user=${username}`);
    var isValid = password === user.password;
    if (isValid) {
        return doneCb(null, user);
    } else {
        return doneCb(null, false);
    };
}));

const expressSession = require("express-session")({
    secret: "geheim+123",
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 2*60*1000  },   
});

 // to make passport remember the user on other pages too.(Read about session store. I used express-sessions.)
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
    console.log("*** Calling the / route ***");
    response.send("Hello, squid!");
    response.end();
});

app.get("/users", (request, response,next) => {
    console.log("*** Calling the /users route ***");
    response.send("Hello, Users!!");
});

app.get("/error", (request, response) => {
    console.log("*** Calling the /error route ***");
    response.send("*** No authentication for this user, baby ***");
});

/*
app.post("/login", (request, response, next) => {
    console.log("*** Calling the /login route ***");
    response.send("*** I need somebody to log ***");
});
*/

app.post("/login", passport.authenticate("local", { failureRedirect: "/error"}),
            (request, response, next) => {
             // if (err) {next(err)}
             console.log("*** Calling the /login route ***");
             response.redirect("/users");
});

portNr = 8026;
app.listen(portNr, () => {
    console.log(`*** Server ist ready auf Port ${portNr} ***`);
});