// file: index.jsp

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    passwort: String
});

const app = express();
app.use(session({
    store: new userSchema(),
    secret: "",
    resave: false,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
