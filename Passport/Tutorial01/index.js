// file: Passport01.js
// Erstellt: 09/06/21
// Umsetzen eines Tutorials - https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/

const app = require("./app")
const port = process.env.PORT || 3000

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`De Server horscht opp de port ${port}...`)
})
