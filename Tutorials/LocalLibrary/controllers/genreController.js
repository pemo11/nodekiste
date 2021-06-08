// file: genreController.js

var Genre = require("../models/genre");
var Book = require("../models/book")
var async = require("async");

// Liste aller Genres
exports.genre_list = (request, response, next) => {
    console.log("*** Calling genre_list ***");
    Genre.find()
    .then(list_genres => {
        response.render("genre_list", {title:"Alle Kategorien", genre_list: list_genres});
    })
    .catch(err => {
       return next(err);
    });
};

// Details zum einem Genre
exports.genre_detail = (request, response, next) => {

    async.parallel({

        genre: (callback) => {
            Genre.findById(request.params.id)
            .exec(callback);
        },

        genre_books: (callback) => {
            Book.find({genre: request.params.id})
            .exec(callback);
        },

    }, (err, results) => {
        if (err) { return next(err);}
        if (results.genre == null) {
            var err = new Error("Kein Genre gefunden (?)");
            err.status = 404;
            return next(err);
        }
        // ALles erfolgreich absolviert
        response.render("genre_detail", {title: "Alle Bücher dieser Kategorie", genre: results.genre, genre_books: results.genre_books});
    });
};

// Genre anlegen Get
exports.genre_create_get = (request, response) => {
    response.send("Noch nicht implementiert - Genre anlegen Get");
};

// Genre anlegen Post
exports.genre_create_post = (request, response) => {
    response.send("Noch nicht implementiert - Genre anlegen Post");
};

// Genre löschen Get
exports.genre_delete_get = (request, response) => {
    response.send("Noch nicht implementiert - Genre löschen Get");
};

// Genre löschen Post
exports.genre_delete_post = (request, response) => {
    response.send("Noch nicht implementiert - Genre löschen Post");
};

// Genre aktualisieren Get
exports.genre_update_get = (request, response) => {
    response.send("Noch nicht implementiert - Genre aktualisieren Get");
};

// Genre aktualisieren Post
exports.genre_update_post = (request, response) => {
    response.send("Noch nicht implementiert - Genre aktualisieren Post");
};
