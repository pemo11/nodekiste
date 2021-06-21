// file: faculty.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FacultySchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        alias: String,
        city: String,
        country: String,
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

FacultySchema
 .virtual("url")
 .get(function() {
     return "/catalog/faculty/" + this._id;
});

module.exports = mongoose.model("Faculty", FacultySchema);