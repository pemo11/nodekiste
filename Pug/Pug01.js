// File: Pug01.js
const pug = require("pug");

const compiledFunction = pug.compileFile("./template.pug");

// Render a set of data
htmlText = compiledFunction({
  name: "Timothy"
});

console.log(htmlText);

console.log(pug.renderFile("./template.pug", { name: "Timothy" }));

console.log("*** Fertig ***");
