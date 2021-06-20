// file: syllabusController.js

var Faculty = require("../models/faculty");
var Syllabus = require("../models/syllabus");
var Course = require("../models/course");
var Helper = require("../models/helper");

var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Standardroute für die Homepage
exports.index = (request, response) => {
    debuglog("*** Callings syllabus index ***");

    async.parallel({
        syllabus_count: (callback) => {
            Syllabus.countDocuments({}, callback);
        },

        faculty_count: (callback) => {
            Faculty.countDocuments({}, callback);
        },

        course_count: (callback) => {
            Course.countDocuments({}, callback);
        },

        helper_count: (callback) => {
            Helper.countDocuments({}, callback);
        },

       
    }, (err, results)=> {
        response.render("index", { title: "Der Studi-Helper", error: err, data: results });
    });
};

// Liste von Studientgängen anzeigen
exports.syllabus_list = (request, response, next) => {
    debuglog("*** Calling syllabus_list ***");
    Syllabus.find({}, "name")
     .exec((err, list_syllabus) => {
        if(err) { return next(err);}
        response.render("syllabus_list", {title:"Alle Studiengänge", syllabus_list: list_syllabus});
     });
};

// Details zu einem Studiengang anzeigen
exports.syllabus_detail = (request, response, next) => {
    debuglog("*** Calling syllabus_detail ***");

    async.parallel({
        syllabus: (callback) => {
            Syllabus.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.syllabus == null){
            var err = new Error("Studiengang nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("syllabus_detail", {title:"Studientgangdetails", syllabuses: result.syllabuss});
    });
};

// Formular für das Anlegen eines Studiengang anzeigen
exports.syllabus_create_get = (request, response) => {
    debuglog("*** Calling syllabus_create_get ***");
    response.send("Noch nicht implementiert: Studiengang anlegen GET");
};

// Studiengang anlegen POST 
exports.syllabus_create_post = (request, response) => {
    debuglog("*** Calling syllabus_create_post ***");
    response.send("Noch nicht implementiert: Studiengang anlegen POST");
};

// Formular für das Löschen eines Studiengangs anzeigen
exports.syllabus_delete_get = (request, response) => {
    debuglog("*** Calling syllabus_delete_get ***");
    response.send("Noch nicht implementiert: Studiengang löschen GET");
};

// Studiengang delete POST
exports.syllabus_delete_post = (request, response) => {
    debuglog("*** Calling syllabus_delete_post ***");
    response.send("Noch nicht implementiert: Studiengang löschen POST");
};

// Formular für das Aktualisieren eines Studiengangs anzeigen
exports.syllabus_update_get = (request, response) => {
    debuglog("*** Calling syllabus_update_get ***");
    response.send("Noch nicht implementiert: Studiengang aktualisieren GET");
};

// Studiengang aktualisieren POST
exports.syllabus_update_post = (request, response) => {
    debuglog("*** Calling syllabus_update_post ***");
    response.send("Noch nicht implementiert: Studiengang aktualisieren POST");
};
