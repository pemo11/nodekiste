// file: helper.js
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HelperSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        source: {type: String, required:true, maxLength:256},
        author: {type: String, required:true, maxLength:100},
        // Problem: avatar soll auf User verweisen, aber auf die avatar-Property von User
        // Geht das in MongoDb überhaupt?
        // avatar: {type: Schema.Types.ObjectId, ref: "User"},
        avatar: {type: String, maxLength: 100},
        createDate: Date,
        creator: {type: Schema.Types.ObjectId, ref: "User", required:true},
        course: {type: Schema.Types.ObjectId, ref: "Course", required:true},
        type: { type: String, required:true, enum: ["YouTube", "Weblink", "Buch", "Sonstiges"],default:"Sonstiges"},
        comment: String,
        rating: {type: Number, required:true},
    }
)
.set("toObject", {virtuals: true}, "toJSON", {virtuals: true});

HelperSchema
 .virtual("url")
 .get(function() {
     return "/catalog/helper/" + this._id;
});

module.exports = mongoose.model("Helper", HelperSchema);