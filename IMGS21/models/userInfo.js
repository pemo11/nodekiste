// file: userinfo.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserInfoSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: "User", required:true},
        fullname: {type: String, required:true, maxLength:100},
        city: {type: String, required:true, maxLength:100},
        country: {type: String, required:true, maxLength:100},
        gender: {type: String, required:true, maxLength:12},
        faculty: {type: String, required:true, maxLength:100},
        syllabus: {type: String, required:true, maxLength:100},
        avatar: {type: String, required:true, maxLength:100},
        birthDate: Date,
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

UserInfoSchema
 .virtual("url")
 .get(function() {
     return "/catalog/userinfo/" + this._id;
});

module.exports = mongoose.model("Userinfo", UserInfoSchema);