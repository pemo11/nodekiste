// File: PassportAuthenticate.js
// Erstellt: 15/06/21 - ich habe versucht, ein Minimal-Beispiel zu erstellen, daas ohne Express auskommt
// Ist wahrscheinlich nicht möglich, da Passport offenbar nur im Zusammenspiel mit Express verwendet werden kann?
// Test per Postman
// https://riptutorial.com/node-js/example/27459/example-of-localstrategy-in-passport-js

const passport = require("passport")
const mongoose = require("mongoose");

var conStr = "mongodb://localhost:27017/Tut4";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", UserSchema, "User");

mongoose.connect(conStr, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {
    console.log("*** Verbindung war ziemlich erfolgreich ***")
    })
.catch(err => {
    console.log(`!!! Fehler beim Herstellen der Verbindung (${err}) !!!`);
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var newUser = "susi5";
var newPassword = "demo+123";

passport.authenticate("local", (err, user) => {
    console.log(`*** Inside the authenticate callback with user=${user.username} ***`);
    if (err) {
        console.log("!!! authenticate error " + err.message);
    }
}, newUser);



/*
User.register(new User({
    username: newUser,
    password: newPassword,
    }), newPassword, (err, user) => {
        if (err) {
            console.log("!!! Fehler bei register: " + err.message + "!!!");
        } else {
            console.log(`*** Register was ok for ${user.username} ***`);
            passport.authenticate("local", (err, user) => {
                console.log("*** Inside the authenticate callback ***");
                if (err) {
                    console.log("!!! authenticate error " + err.message);
                }
            })
        }
    }
);

*/