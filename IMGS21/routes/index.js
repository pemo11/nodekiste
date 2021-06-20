// file: index.js

var express = require("express");
var router = express.Router();

/* GET home page */
router.get("/", (request, response, next) => {
  response.redirect("/catalog");
});

module.exports = router;
