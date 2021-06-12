// file: Debuglog03.js
const util = require("util");
// NODE_DEBUG enthält entweder app oder timer oder gar nichts
const logGeneral = util.debuglog("app");
const logTimer = util.debuglog("timer");
const delay = 500;

logGeneral("Die App startet...");

setTimeout(() => {
  logTimer("Der Timer hat nach %d Sekunden gefeuert", delay);
}, delay);
