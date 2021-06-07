// File: EnvTest02.js
// direktes Parsen

const dotenv = require("dotenv");

const envTest = "lang1=BASIC\nlang2=LISP";

var langs = dotenv.parse(envTest);

console.log(`Lang1=${langs.lang1}`)
console.log(`Lang2=${langs.lang2}`)