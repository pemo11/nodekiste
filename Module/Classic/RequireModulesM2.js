// File: RequireModulesM2.js

var mod = require(__dirname + "/m2");

feet = 30000
console.log(`${feet} Feet sind ca. ${mod.feet2Meter(feet)} Meter`)

meter = 9200
console.log(`${meter} Meter sind ca. ${mod.meter2Feet(meter)} Feet`)
