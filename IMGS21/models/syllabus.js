// file: syllabus.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SyllabusSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        alias: String,
        faculty: {type: Schema.Types.ObjectId, ref: "Faculty", required:true},
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

SyllabusSchema
 .virtual("url")
 .get(function() {
     return "/catalog/syllabus/" + this._id;
});

module.exports = mongoose.model("Syllabus", SyllabusSchema);