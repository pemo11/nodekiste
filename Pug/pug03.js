// File: Pug01.js
const pug = require("pug");

const compiledFunction = pug.compileFile("./template3.pug");

// Render a set of data
htmlText = compiledFunction(
  { title: "pug 03" });

console.log(htmlText);

console.log("*** Fertig ***");
