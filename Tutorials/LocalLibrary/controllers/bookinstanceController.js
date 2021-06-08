// file: bookController.js

const { nextTick } = require("async");
var BookInstance = require("../models/bookinstance");
var luxon = require("luxon");

// Liste aller BookInstances
exports.bookinstance_list = (request, response) => {
    BookInstance.find()
    .populate("Book")
    .exec((err, list_bookinstances) => {
        if (err) { return next(err);}
        response.render("bookinstance_list", {title:"Alle Buchexemplare", bookinstance_list: list_bookinstances});
    });
};

// Details zu einer Book Instance
exports.bookinstance_detail = (request, response, next) => {
    BookInstance.findById(request.params.id)
    .populate("book")
    .exec((err, bookinstance)=> {
        if (err) {return next(err)};
        if (bookinstance==null) {
            var err = new Error("Buchexamplar nicht gefunden.");
            err.status = 404;
            return next(err);
        }
        // Alles klar, also ausgeben
        response.render("bookinstance_detail", {title:"Exemplar" + bookinstance.book.title, bookinstance: bookinstance});

    })
};

// BookInstance anlegen Get
exports.bookinstance_create_get = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance anlegen Get");
};

// BookInstance anlegen Post
exports.bookinstance_create_post = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance anlegen Post");
};

// BookInstance löschen Get
exports.bookinstance_delete_get = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance löschen Get");
};

// BookInstance löschen Post
exports.bookinstance_delete_post = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance löschen Post");
};

// BookInstance aktualisieren Get
exports.bookinstance_update_get = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance aktualisieren Get");
};

// BookInstance aktualisieren Post
exports.bookinstance_update_post = (request, response) => {
    response.send("Noch nicht implementiert - BookInstance aktualisieren Post");
};
