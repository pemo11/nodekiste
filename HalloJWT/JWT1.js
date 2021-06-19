// file: JWT1.js
// Passport-Authentifizierung per JWT
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Kennenlernen von JWT

const base64 = require("base64url");

const headerInBase64UrlFormat = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9"

const decoded = base64.decode(headerInBase64UrlFormat);

console.log(decoded)