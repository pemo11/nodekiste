// file: PassportAuthenticate1.js
// erstellt: 15/06/21

// Das Beispiel geht einfach nicht, ich verstehe immer noch nicht, wie passport funktioniert
// Der Post-Aufruf ist zwar möglich, aber dann wird nur die error-Route aufgerufen - mehr nicht, echt frustrierend!

const express = require("express");
const app = express();

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var user = {
    id: 1000,
    username: "pemo"
};

// In serialize user you decide what to store in the session. Here I'm storing the user id only.
passport.serializeUser((user, done) => { 
    console.log(`*** Calling serizialeUser with user=${user.username}`);
    done(null, user.id);
});

// Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
passport.deserializeUser((id, done) => {
    console.log(`*** Calling passport->deserizalize with id=${id}`);
    user = user;
    done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
    console.log(`*** Calling passport with user=${username}`);
    return done(null, user);
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

app.post("/login", passport.authenticate("local", {
                    successRedirect:"/users",
                    failureRedirect: "/error"}),
                    (request, response, next) => {
                    console.log("*** Calling the /login route ***");
});

portNr = 8026;
app.listen(portNr, () => {
    console.log(`*** Server ist ready auf Port ${portNr} ***`);
});