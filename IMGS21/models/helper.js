// file: helper.js
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HelperSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        createDate: Date,
        author: {type: Schema.Types.ObjectId, ref: "User", required:true},
        description: String,
        ratings: {type: Int, required:true},
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

HelperSchema
 .virtual("url")
 .get(function() {
     return "/catalog/helper/" + this._id;
});

module.exports = mongoose.model("Helper", HelperSchema);