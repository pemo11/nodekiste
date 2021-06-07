var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  // response.render('index', { title: 'Express' });
  response.redirect("/catalog");
});

module.exports = router;
