// file: Debuglog04.js - Erstellt: 08/07/21
// Ausgabe der Uhrzeit
// Geht leider nicht - die Idee war, dass die Uhrzeit automatisch jeder Meldung vorangestellt wird durch den Callback
const util = require("util");

var logGeneral = util.debuglog("app", d => {
    let curDate = new Date();
    let curTime = curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
    logGeneral = d(curTime)
});

logGeneral("Die App startet...");
