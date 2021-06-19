// file: JWT4.js
// Erstellt: 19/06/21 - Überprüfen einer Signatur mit Hilfe eines Public Key

const base64 = require("base64url");
const crypto = require("crypto");
const verifyFunction = crypto.createVerify("RSA-SHA256");
const fs = require("fs");

// Eine JWT-Signatur, die künstlich erzeugt wurde
const JWT = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA";

// Einlesen des Public Key für das Entschlüsseln
const PUB_KEY = fs.readFileSync(__dirname + "/key.pub", "utf8");

const jwtHeader = JWT.split(".")[0]
const jwtPayload = JWT.split(".")[1]
const jwtSignature = JWT.split(".")[2]

// Überprüfen von Header und Payload
verifyFunction.write(jwtHeader + "." + jwtPayload);
verifyFunction.end();

// Signatur nach Base64
const jwtSignatureBase64 = base64.toBase64(jwtSignature);

// Überprüfen der Signatur mit Hilfe des Public Key
const signatureIsValid = verifyFunction.verify(
    PUB_KEY,
    jwtSignatureBase64,
    "base64"
);

// Sollte true ergeben
console.log(signatureIsValid);
