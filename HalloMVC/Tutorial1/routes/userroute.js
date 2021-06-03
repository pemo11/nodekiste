// File: userroute.js

var express = require("express");
var router = express.Router();

var userController = require("../controllers/usercontroller");

router.get("/", userController.userList);

router.get("/userform", userController.userForm);

router.post("/create", userController.createData);

module.exports = router;

