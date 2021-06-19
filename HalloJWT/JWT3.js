// file: JW3.js
// Passport-Authentifizierung per JWT
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Kennenlernen von JWT - Zusammenstellen eines JTW-Token

const base64 = require("base64url");
const crypto = require("crypto");
const signatureFunction = crypto.createSign("RSA-SHA256");

const fs = require("fs");

const headerObj = {
    alg: "RS256",
    typ: "JWT",
};

const payloadObj = {
    sub: "1234567890",
    name: "pemo",
    admin: true,
    iat: 1516239022,
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64(headerObjString);
const base64UrlPayload = base64(payloadObjString);

signatureFunction.write(base64UrlHeader + "." + base64UrlPayload);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(__dirname + "/key.pem", "utf8");
const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");

const signatureBase64Url = base64.fromBase64(signatureBase64);

console.log(signatureBase64Url);