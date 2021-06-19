// file: JWT5.js
// Erstellt: 19/06/21 - Signieren eines JWT per jsonwebtoken
const jwt = require("jsonwebtoken");
const fs = require("fs");

const PUB_KEY = fs.readFileSync(__dirname + "/key.pub", "utf8");
const PRIV_KEY = fs.readFileSync(__dirname + "/key.pem", "utf8");

const payload = {
    sub: "1234567890",
    name: "Pemo",
    admin: true,
    iat: 1516239022,
}

const signedJWT = jwt.sign(payload, PRIV_KEY, {algorithm: "RS256"});

// console.log(signedJWT);

jwt.verify(signedJWT, PUB_KEY, {
    algorithms: ["RS256"] },
    (err, tokenPayload) => {
        if (err == null) {
            console.log("*** Alles Roger mit dem Token ***");
        } else if (err.name === "TokenExpiredError") {
            console.log("*** Der Token ist traurigerweise total abgelaufen ***");
        } else if (err.name === "JsonWebTokenError") {
            console.log("Der Token ist kaputt...");
        } else {
            console.log("!!! Unbekannter Grund !!!");
        }
        // Sollten beide gleich sein
        console.log(payload);
        console.log();
        console.log(tokenPayload);
    }
);