// File: start.js

const app = require("./app");

const portNr = 8082;

const server = app.listen(portNr, () => {
  console.log(`Express is running on port ${server.address().port}`);
});


