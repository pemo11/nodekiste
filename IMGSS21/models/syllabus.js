// file: syllabus.js
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SyllabusSchema = new Schema(
    {
        name: {type: String, required:true, maxLength:100},
        faculty_name: {type: String, required:true, maxLength:100},
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

SyllabusSchema
 .virtual("url")
 .get(function() {
     return "/catalog/syllabus/" + this._id;
});

module.exports = mongoose.model("Syllabus", SyllabusSchema);