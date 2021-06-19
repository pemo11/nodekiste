// file: JWT2.js
// Passport-Authentifizierung per JWT
// https://www.zachgollwitzer.com/posts/2020/passport-js/
// Kennenlernen von JWT - Ausgabe der Payloat eines JWT Tokens

const base64 = require("base64url");

const JWT_BASE64_URL = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA";

const jwtParts = JWT_BASE64_URL.split(".");

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

const decodedHeader = base64.decode(headerInBase64UrlFormat);
const decodedPayload = base64.decode(payloadInBase64UrlFormat);
const decodedSignature = base64.decode(signatureInBase64UrlFormat);

console.log(decodedHeader);
console.log(decodedPayload);
console.log(decodedSignature);