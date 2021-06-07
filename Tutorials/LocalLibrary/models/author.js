// file: author.js

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required:true, maxLength:100},
        family_name: {type: String, required:true, maxLength:100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

AuthorSchema
 .virtual("name")
 .get(() => {
     return this.family_name + "," + this.first_name;
});

AuthorSchema
 .virtual("url")
 .get(() => {
     return "/catalog/author/" + this._id;
});

AuthorSchema
 .virtual("lifespan")
 .get(() => {
     return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

module.exports = mongoose.model("Author", AuthorSchema);
