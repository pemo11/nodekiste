const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEMail, getUserById, logger) {
    logger("*** Calling Initialize ***");
    const authenticateUser = async (email, password, done) => {
        logger("*** Calling authenticateUser ***");
        const user = getUserByEMail(email);
        if (user == null) {
            // Erster Parameter wäre user, der zweite Parameter betrifft den User, der in diesem Fall nicht gefunden wurde
            logger("*** Häh? ***");
            return done(null, false, {messages: "Diesen User kennen wir nicht"})
        }

        try {
            // password = eingegebenes Passwort
            if (await bcrypt.compare(password, user.password)) {
                // der authentifizierte user wird zurückgegeben
                logger("*** Passwort passt ***");
                return done(null, user, {message: "Anmeldung war ein voller Erfolg"})
            } else {
                logger("*** Passwort passt net ***");
                return done(null, false, {message: "Das Passwort stimmt irgendwie nicht"});
            }
        } catch (err) {
            return done(err);
        }

    }
    passport.use(
        new LocalStrategy({
            usernameField: "email",
         }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = initialize