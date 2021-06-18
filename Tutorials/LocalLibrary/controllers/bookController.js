// file: bookController.js

var Book = require("../models/book");
var BookInstance = require("../models/bookinstance");
var Author = require("../models/author");
var Genre = require("../models/genre");

var async = require("async");
const { genre_delete_get } = require("./genreController");

const util = require("util");
const debuglog = util.debuglog("app");

// Homepage
exports.index = (request, response) => {
    debuglog("*** Calling book index ***");

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
exports.book_list = (request, response, next) => {
    debuglog("*** Calling book_list ***");
    Book.find({}, "title author")
    // Befülle das author-Feld mit dem Objekt aus der author-lissssssst
     .populate("author")
     .exec((err, list_books) => {
        if(err) { return next(err);}
        response.render("book_list", {title:"Alle Bücher", book_list: list_books});
     });
};

// Details zum einem Book
exports.book_detail = (request, response, next) => {
    debuglog("*** Calling book_detail ***");

    async.parallel({
        book: (callback) => {

            Book.findById(request.params.id)
             .populate("author")
             .populate("genre")
             .exec(callback)
        },

        book_instance: (callback) => {
            BookInstance.find({"book": request.params.id})
            .exec(callback)
        },

    }, (err, results) => {
        if (err) { return next(err)}
        if (results.book == null) {
            var err = new Error("Buch nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar - gib was zurück
        response.render("book_detail", {title: results.book.title, book: results.book, book_instances: results.book_instance});
    });

};

// Book anlegen Get
exports.book_create_get = (request, response) => {
    debuglog("*** Calling book_create_get ***");
    response.send("Noch nicht implementiert - Book anlegen Get");
};

// Book anlegen Post
exports.book_create_post = (request, response) => {
    debuglog("*** Calling book_create_post ***");
    response.send("Noch nicht implementiert - Book anlegen Post");
};

// Book löschen Get
exports.book_delete_get = (request, response) => {
    debuglog("*** Calling book_delete_get ***");
    response.send("Noch nicht implementiert - Book löschen Get");
};

// Book löschen Post
exports.book_delete_post = (request, response) => {
    debuglog("*** Calling book_delete_post ***");
    response.send("Noch nicht implementiert - Book löschen Post");
};

// Book aktualisieren Get
exports.book_update_get = (request, response) => {
    debuglog("*** Calling book_update_get ***");
    response.send("Noch nicht implementiert - Book aktualisieren Get");
};

// Book aktualisieren Post
exports.book_update_post = (request, response) => {
    debuglog("*** Calling book_create_post ***");
    response.send("Noch nicht implementiert - Book aktualisieren Post");
};
