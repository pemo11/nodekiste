// file: debuglog02.js
// Erstellt: 12/06/2021
// Start unter bash NODE_DEBUG=test1234 node debuglog01

const { debuglog } = require("util");
  
const logger = debuglog("test1234");

// Die Meldung erscheint nur, wenn die Umgebungsvariable NODE_DEBUG den Wert Test1234 erhalten hat
logger("Das ist eine weitere coole Debug-Meldung [%d]",1234);