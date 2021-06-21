// file: facultyController.js

var Faculty = require("../models/faculty");
const { body,validationResult } = require("express-validator");
var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Liste von Fakultäten anzeigen
exports.faculty_list = (request, response, next) => {
    debuglog("*** Faculty Controller - calling faculty_list ***");
    Faculty.find({}, "title")
     .exec((err, list_faculties) => {
        if(err) { return next(err);}
        response.render("faculty_list", {title: "Alle Fakultäten", faculty_list: list_faculties});
     });
};

// Details zu einer Fakultät anzeigen
exports.faculty_detail = (request, response, next) => {
    debuglog("*** Faculty Controller - calling faculty_detail ***");
    async.parallel({
        faculty: (callback) => {
            Faculty.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.faculty == null){
            var err = new Error("Fakultät nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("faculty_detail", {title:" Details zu einer Fakultät", faculty: results.faculty});
    });
};
