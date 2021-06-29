// file: user.js

var mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required:true, maxLength:100},
        email: {type: String, required:true, maxLength:100},
        createDate: Date,
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

UserSchema.plugin(passportLocalMongoose);

UserSchema
 .virtual("url")
 .get(function() {
     return "/catalog/user/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);