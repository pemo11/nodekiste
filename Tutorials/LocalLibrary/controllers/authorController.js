// file: authorController.js

var Author = require("../models/author");
var Book = require("../models/book");
var Async = require("async");

// Liste von Autoren anzeigen
exports.author_list = (request, response, next) => {
    Author.find({}, "name")
     .exec((err, list_authors) => {
        if(err) { return next(err);}
        response.render("author_list", {title:"Alle Autoren", author_list: list_authors});
     });

};

// Details zu einem Autor anzeigen
exports.author_detail = (request, response, next) => {

    async.parallel({
        author: (callback) => {
            Author.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.author == null){
            var err = new Error("Autor nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("author_detail", {title:"Autordetails", author: results.author, author_books: result.author_books});
    });
};

// Formular für das Anlegen eines Autors anzeigen
exports.author_create_get = (request, response) => {
    response.send("Noch nicht implementiert: Autor anlegen Formular");
};

// Autor anlegen POST 
exports.author_create_post = (request, response) => {
    response.send("Noch nicht implementiert: Autor anlegen POST");
};

// Formular für das Löschen eines Autors anzeigen
exports.author_delete_get = (request, response) => {
    response.send("Noch nicht implementiert: Autor löschen GET");
};

// Autor delete POST
exports.author_delete_post = (request, response) => {
    response.send("Noch nicht implementiert: Autor löschen POST");
};

// Formular für das Aktualisieren eines Autors anzeigen
exports.author_update_get = (request, response) => {
    response.send("Noch nicht implementiert: Autor aktualisieren GET");
};

// Autor aktualisieren POST
exports.author_update_post = (request, response) => {
    response.send("Noch nicht implementiert: Autor aktualisieren POST");
};



