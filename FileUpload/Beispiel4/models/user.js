// file: user.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required:true, maxLength:100},
        eMail: {type: String, required:true, maxLength:100},
        createDate: Date,
        avatar: String,
    }
)

module.exports = mongoose.model("User", UserSchema);