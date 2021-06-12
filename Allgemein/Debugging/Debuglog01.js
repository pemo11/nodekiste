// file: debuglog01.js
// Erstellt: 08/06/2021
// Start unter bash NODE_DEBUG=test1234 node debuglog01

const util = require("util");
const debuglog = util.debuglog("test1234");

// Die Meldung erscheint nur, wenn die Umgebungsvariable NODE_DEBUG den Wert Test1234 erhalten hat
debuglog("Das ist eine Debug-Meldung [%d]",1234);