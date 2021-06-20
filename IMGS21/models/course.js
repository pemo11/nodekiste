// file: course.js
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CourseSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        description: String,
        alias: String,
        semester: String,
        syllabus: {type: Schema.Types.ObjectId, ref: "Syllabus", required:true},
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

CourseSchema
 .virtual("url")
 .get(function() {
     return "/catalog/course/" + this._id;
});

module.exports = mongoose.model("Course", CourseSchema);