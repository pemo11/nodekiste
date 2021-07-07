// file: server.js
// erstellt: 04 /07/21 - erstes PWA-Beispiel

const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
require("dotenv").config({path: __dirname + "/.env"});

// Ist diese Einstellung erforderlich?
app.enable("trust proxy");

app.use(express.static(path.join(__dirname, "public")));

const key = fs.readFileSync(path.join(__dirname, "certs/localhost.key"));
const cert = fs.readFileSync(path.join(__dirname, "certs/localhost.crt"));

const httpsServer = https.createServer({key: key, cert: cert }, app);

// http-Anfragen auf Https umleiten
app.use((request, response, next) => {
    if (!request.secure) {
        // return response.redirect("https://" + request.headers.host + request.url);
        return response.redirect("https://localhost:8051" + request.url);
    }
    next();
});

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
})

portNrHttp = process.env.portNrHttp;
portNrHttps = process.env.portNrHttps;

httpsServer.listen(portNrHttps, () => {
    console.log(`*** Der HTTPS-Server horcht sicher auf Port Nr ${portNrHttps} ***`);

})

app.listen(portNrHttp, () => {
    console.log(`*** Der HTTP-Server horcht auf Port Nr ${portNrHttp} ***`);
});
