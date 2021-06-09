// file: bookinstance.js

var mongoose = require("mongoose");
const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
        imprint: {type: String, required:true},
        status: {type: String, required:true, enum: ["Verfuegbar", "Reperatur", "Ausgeliehen", "Reserviert"],default:"Reperatur"},
        due_back: {type: Date, default: Date.now}
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

BookInstanceSchema
 .virtual("url")
 .get(function () {
     return "/catalog/bookinstance/" + this._id;
 });

 BookInstanceSchema
.virtual("due_back_formatted")
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
