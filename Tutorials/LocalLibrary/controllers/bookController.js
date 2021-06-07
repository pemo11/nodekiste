// file: bookController.js

var Book = require("../models/book");
var BookInstance = require("../models/bookinstance");
var Author = require("../models/author");
var Genre = require("../models/genre");

var async = require("async");
const { genre_delete_get } = require("./genreController");

// Homepage
exports.index = (request, response) => {

    async.parallel({
        book_count: (callback) => {
            Book.countDocuments({}, callback);
        },

        book_instance_count: (callback) => {
            BookInstance.countDocuments({}, callback);
        },

        book_instance_available_count: (callback) => {
            BookInstance.countDocuments({status:"Verfuegbar"}, callback);
        },

        author_count: (callback) => {
            Author.countDocuments({}, callback);
        },

        genre_count: (callback) => {
            Genre.countDocuments({}, callback);
        }
    }, (err, results)=> {
        response.render("index", { title: "Besondere Computerbücher", error: err, data: results });
    });
};

// Liste aller Books
exports.book_list = (request, response) => {
    Book.find({}, "title author")
    // Befülle das author-Feld mit dem Objekt aus der author-lissssssst
     .populate("author")
     .exec((err, list_books) => {
        if(err) { return next(err);}
        response.render("book_list", {title:"Alle Bücher", book_list: list_books});
     });
};

// Details zum einem Book
exports.book_detail = (request, response) => {
    response.send("Noch nicht implementiert - Details zu einem Book");
};

// Book anlegen Get
exports.book_create_get = (request, response) => {
    response.send("Noch nicht implementiert - Book anlegen Get");
};

// Book anlegen Post
exports.book_create_post = (request, response) => {
    response.send("Noch nicht implementiert - Book anlegen Post");
};

// Book löschen Get
exports.book_delete_get = (request, response) => {
    response.send("Noch nicht implementiert - Book löschen Get");
};

// Book löschen Post
exports.book_delete_post = (request, response) => {
    response.send("Noch nicht implementiert - Book löschen Post");
};

// Book aktualisieren Get
exports.book_update_get = (request, response) => {
    response.send("Noch nicht implementiert - Book aktualisieren Get");
};

// Book aktualisieren Post
exports.book_update_post = (request, response) => {
    response.send("Noch nicht implementiert - Book aktualisieren Post");
};
