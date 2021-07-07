// file: server.js
// erstellt: 04 /07/21 - erstes PWA-Beispiel

// no-cors setzen?

const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
require("dotenv").config({path: __dirname + "/.env"});

// Ist diese Einstellung erforderlich?
app.enable("trust proxy");
app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins = ["http://localhost:8050","https://localhost:8051"];

const cors = require("cors");

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const key = fs.readFileSync(path.join(__dirname, "certs/localhost.key"));
const cert = fs.readFileSync(path.join(__dirname, "certs/localhost.crt"));

const httpsServer = https.createServer({key: key, cert: cert }, app);

portNrHttp = process.env.portNrHttp;
portNrHttps = process.env.portNrHttps;

// http-Anfragen auf Https und den zuständigen Port umleiten
app.use((request, response, next) => {
    if (!request.secure) {
        var newUrl = `https://${request.hostname}:${portNrHttps}` + request.url;
        // return response.redirect("https://" + request.headers.host + request.url);
        console.log("*** Wir leiten um auf " + newUrl);
        return response.redirect(newUrl);
    }
    next();
});

app.get("/", (request, response) => {
    response.sendFile("index.html");
})

httpsServer.listen(portNrHttps, () => {
    console.log(`*** Der HTTPS-Server horcht sicher auf Port Nr ${portNrHttps} ***`);

})

app.listen(portNrHttp, () => {
    console.log(`*** Der HTTP-Server horcht auf Port Nr ${portNrHttp} ***`);
});
