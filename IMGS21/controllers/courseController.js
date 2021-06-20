// file: courseController.js

var Course = require("../models/course");
var Async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Liste von Kursen anzeigen
exports.course_list = (request, response, next) => {
    debuglog("*** Calling course_list ***");
    Course.find({}, "name")
     .exec((err, list_courses) => {
        if(err) { return next(err);}
        response.render("course_list", {title: "Alle Kurse", course_list: list_courses});
     });
};

// Details zu einem Kurs anzeigen
exports.course_detail = (request, response, next) => {
    debuglog("*** Calling course_detail ***");
    async.parallel({
        course: (callback) => {
            Course.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.course == null){
            var err = new Error("Kurs nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("course_detail", {title:"Details zu einem Kurs", course: result.course});
    });
};

// Formular für das Anlegen eines Kurs anzeigen
exports.course_create_get = (request, response) => {
    debuglog("*** Calling course_create_get ***");
    response.send("Noch nicht implementiert: Kurs anlegen GET");
};

// Kurs anlegen POST 
exports.course_create_post = (request, response) => {
    debuglog("*** Calling course_create_post ***");
    response.send("Noch nicht implementiert: Kurs anlegen POST");
};

// Formular für das Löschen eines Kurses anzeigen
exports.course_delete_get = (request, response) => {
    debuglog("*** Calling course_delete_get ***");
    response.send("Noch nicht implementiert: Kurs löschen GET");
};

// Kurs delete POST
exports.course_delete_post = (request, response) => {
    debuglog("*** Calling course_delete_post ***");
    response.send("Noch nicht implementiert: Kurs löschen POST");
};

// Formular für das Aktualisieren eines Kurses anzeigen
exports.course_update_get = (request, response) => {
    debuglog("*** Calling course_update_get ***");
    response.send("Noch nicht implementiert: Kurs aktualisieren GET");
};

// Kurs aktualisieren POST
exports.course_update_post = (request, response) => {
    debuglog("*** Calling course_update_post ***");
    response.send("Noch nicht implementiert: Kurs aktualisieren POST");
};
