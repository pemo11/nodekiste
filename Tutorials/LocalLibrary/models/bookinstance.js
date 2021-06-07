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
);

BookInstanceSchema
 .virtual("url")
 .get(()=> {
     return "/catalog/bookinstance/" + this._id;
 });

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
