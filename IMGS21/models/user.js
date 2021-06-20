// file: user.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required:true, maxLength:100},
        email: {type: String, required:true, maxLength:100},
        password: {type: String, maxLength:100},
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

UserSchema
 .virtual("url")
 .get(function() {
     return "/catalog/user/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);