// File: RequireModulesM3.js

var mod = require(__dirname + "/m3");

var z = 0;
mod.GetLucky()
 .then((n) => {
     z = n;
 });

console.log(`Deine aktuelle Glückszahl ist ${z}`);

