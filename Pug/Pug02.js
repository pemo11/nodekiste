// File: Pug01.js
const pug = require("pug");

const compiledFunction = pug.compileFile("./template2.pug");

// Render a set of data
htmlText = compiledFunction({
  titel: "Beispiel Nr. 2",
  person: {name:"Pemo",location:"Esslinga"}
});

console.log(htmlText);

console.log("*** Fertig ***");
