// File: Pug01.js
const pug = require("pug");

const compiledFunction = pug.compileFile("./template4.pug");

// Render a set of data
htmlText = compiledFunction(
  { title: "pug 04", data: {name:"Pemo",alter:56,wohnort:"Esslinga"} });

console.log(htmlText);

console.log("*** Fertig ***");
