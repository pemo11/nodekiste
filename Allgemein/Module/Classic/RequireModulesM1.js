// File: RequireModul01.js

// g:\Nodekiste\ExpressMVC/m1.js'
// Geht
var mod = require(__dirname + "/m1");
// Geht nicht
// var mod = require("/Modul1");

z = mod.GetLucky();

console.log(`MagicNum=${mod.MagicNum}`);

console.log(`Deine aktuelle Glückszahl ist ${z}`);

