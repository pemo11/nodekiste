// File: Hallo05.js - Wie Beispiel Nr. 4 - mit Fehlerhehandlung
// Das Schlüsselpaar wird zuvor per Openssl.exe angelegt (unter Windows aus dem github.exe-Verzeichnis)

// Mal wieder typisch...
// Beispiel Nr. 4 funktonierte einfach nicht, beim Aufruf der Seite gab es einen ciphermismatch error
// Google hilf, guter Tipp von
// https://dev.to/itssimondev/node-js-errsslversionorciphermismatch-58o7
// Durch Umstellen der Reihenfolge ging es und ich dachte, das wars und ich hatte wieder einmal ein Problem mit der Reihenfolge
// Dabei hatte ich nur den options-Parameter beim Aufruf von createrServer() vergessen;)
// Das per openSSH selbst ausgestellte Zertifikat ist jedenfalls ok
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

const https = require("https");
const fs = require("fs");

const options = {
    // Pfade müssen absolut sein
    key: fs.readFileSync(__dirname + "//" + "key.pem"),
    cert: fs.readFileSync(__dirname + "//" + "cert.pem"),
    // passphrase: "!nopw2020"
  };

var portNr = 8083;

// Dieses Mal wird das Server-Objekt zuerst erzeugt, der listen()-Aufruf folgt später
httpsServer = https.createServer(options, (request, response) => {
    // HTTP header mit einem Status: 200 : OK und Content Type: text/plain senden
    response.writeHead(200, {"Content-Type": "text/plain"});
    // Als Response-Body wird wieder ein eher belangloser Text gesendet
    response.end("Node.js ist dank SSL zu 111% sicher (oder?)!\n");
});

httpsServer.on("error", () => {
    console.log("App kann leider nicht für Port ${httpsPort} gestartet werden");
    process.exit();
  });

httpsServer.listen(portNr, () => {
     // Kontrollmeldung für die Konsole ausgeben
    console.log(`Node.js horcht auf https://127.0.0.1:${portNr}`);
   
 });
 
