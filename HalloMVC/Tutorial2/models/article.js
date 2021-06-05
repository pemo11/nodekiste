// file: article.js
// Es ist wirklich faszinierend, dass es am Anfang weder die Collection noch die Database geben muss
// Mit dem ersten Save werden beide angelegt

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = new schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    article_image: {
        type: String,
        required: false,
    },

    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = Article = mongoose.model("Article", articleSchema);