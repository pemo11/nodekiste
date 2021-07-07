// file: user.js

var mongoose = require("mongoose");
var passportLocal = require("passport-mongoose-local");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    email: String
})

UserSchema.plugin(passportLocal);

module.expors = new UserSchema("User", UserSchema);
