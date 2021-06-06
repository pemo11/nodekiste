// File: Pug01.js
const pug = require("pug");

const compiledFunction = pug.compileFile("./template1.pug");

// Render a set of data
htmlText = compiledFunction({
  name: "Timothy"
});

console.log(htmlText);

console.log(pug.renderFile("./template1.pug", { name: "Timothy" }));

console.log("*** Fertig ***");
