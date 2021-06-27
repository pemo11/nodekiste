// file: passport.js

const bcrypt = require("bcryptjs");
const user = require("../models/user");
const passport = require("passport");

// Beim Serialisieren des User-Objekts soll die Id gespeichert werden
passport.serializeUser((user, doneCb) => {
    doneCb(null, user.id);
});

// Beim Deserialisieren eines in der Session gespeicherten User-Objekts erhalten wir die id zurück
passport.deserializeUser((id, doneCb) => {
    User.findById(id, (err, user) => {
        doneCb(err, user);
    });
});

// Registrieren der lokalen Strategie
passport.use(new LocalStrategy((username, password, doneCb) => {
    console.log(`*** Calling passport with user=${username}`);
    User.find({username:{username}})
    .then((err, user) => {
        bcrypt.compare(password, user.password, (err, status) => {
            if (err) throw err;
            if (isMatch) {
                return doneCb(null, user);
            } else {
                return doneCb(null, false, {message: "Passwort stimmt nicht"});
            }
        });
    });
}));

module.exports = passport;