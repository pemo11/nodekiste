// file: author.js

var mongoose = require("mongoose");
// {} ist ab ES6 eine Abkürzung, um mehrere Properties eines Objekts mehreren Variablen zuzuweisen
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required:true, maxLength:100},
        family_name: {type: String, required:true, maxLength:100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
)
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

AuthorSchema
 .virtual("name")
 // keine Arrow function wegen this
 .get(function() {
     return this.family_name + "," + this.first_name;
});

AuthorSchema
 .virtual("url")
 .get(function() {
     return "/catalog/author/" + this._id;
});

AuthorSchema
 .virtual("lifespan")
 .get(function() {
     // return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
     return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
 .virtual("date_of_birth_yyyy_mm_dd")
 .get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});
  
AuthorSchema
 .virtual("date_of_death_yyyy_mm_dd")
 .get(function() {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Author", AuthorSchema);