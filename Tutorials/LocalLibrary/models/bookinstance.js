// file: bookinstance.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
        imprint: {type: String, required:true},
        status: {type: String, required:true, enum: ["Verfügbar", "Reparatur", "Ausgeliehen", "Reserviert"],default:"Reparatur"},
        bue_back: {type: Date, default: Date.now}
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

BookInstanceSchema
 .virtual("url")
 .get(function () {
     return "/catalog/bookinstance/" + this._id;
 });

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
