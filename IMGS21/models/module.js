// file: module.js
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModuleSchema = new Schema(
    {
        name: {type: String, required:true, maxLength:100},
        description: String,
        alias: String,
        syllabus: {type: Schema.Types.ObjectId, ref: "Syllabus", required:true},
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

ModuleSchema
 .virtual("url")
 .get(function() {
     return "/catalog/module/" + this._id;
});

module.exports = mongoose.model("Module", ModuleSchema);