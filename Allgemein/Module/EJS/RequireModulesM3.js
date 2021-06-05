// File: RequireModulM3.js
// Dies ist die modernere Variante, die aber voraussetzt, dass eine package.json-Datei gibt, in der das Modul m2.js definiert ist
// Verträgt sich nicht mit required

import m3 from "./m3.js"

console.log(`MagicNum=${m3.MagicNum}`);

var z = m3.GetLucky();
console.log(`Deine aktuelle Glückszahl ist ${z}`);
