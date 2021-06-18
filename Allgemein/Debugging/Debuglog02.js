<<<<<<< HEAD
// file: debuglog02.js
// Erstellt: 12/06/2021
// Start unter bash NODE_DEBUG=test1234 node debuglog01
=======
// file: Debuglog02.js
const util = require("util");
// NODE_DEBUG enthält entweder app oder timer oder gar nichts3
const logGeneral = util.debuglog("app");
const logTimer = util.debuglog("timer");
const delay = 500;
>>>>>>> b17ebe77b2974a45b83171735b5a25d6d75ccb70

const { debuglog } = require("util");
  
const logger = debuglog("test1234");

// Die Meldung erscheint nur, wenn die Umgebungsvariable NODE_DEBUG den Wert Test1234 erhalten hat
logger("Das ist eine weitere coole Debug-Meldung [%d]",1234);