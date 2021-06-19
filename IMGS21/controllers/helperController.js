// file: helperController.js

var Helper = require("../models/helper");
var Async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Liste von helpern anzeigen (Liste kann theoretisch sehr groß werden)
exports.helper_list = (request, response, next) => {
    debuglog("*** Calling helper_list ***");
    Helper.find({}, "title")
     .exec((err, list_helper) => {
        if(err) { return next(err);}
        response.render("helper_list", {title: "Alle Helper", helper_list: list_helper});
     });
};

// Details zu einem Helper anzeigen
exports.helper_detail = (request, response, next) => {
    debuglog("*** Calling helper_detail ***");

    async.parallel({
        helper: (callback) => {
            Helper.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.helper == null){
            var err = new Error("Helper nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("helper_detail", {title:"Details zu einem Helper", helper: result.helper});
    });
};

// Formular für das Anlegen eines Helpers anzeigen
exports.helper_create_get = (request, response) => {
    debuglog("*** Calling helper_create_get ***");
    response.send("Noch nicht implementiert: Helper anlegen GET");
};

// Helper anlegen POST 
exports.helper_create_post = (request, response) => {
    debuglog("*** Calling helper_create_post ***");
    response.send("Noch nicht implementiert: Helper anlegen POST");
};

// Formular für das Löschen eines Helpers anzeigen
exports.helper_delete_get = (request, response) => {
    debuglog("*** Calling helper_delete_get ***");
    response.send("Noch nicht implementiert: Helper löschen GET");
};

// Helper delete POST
exports.helper_delete_post = (request, response) => {
    debuglog("*** Calling helper_delete_post ***");
    response.send("Noch nicht implementiert: Helper löschen POST");
};

// Formular für das Aktualisieren eines Helpers anzeigen
exports.helper_update_get = (request, response) => {
    debuglog("*** Calling helper_update_get ***");
    response.send("Noch nicht implementiert: Helper aktualisieren GET");
};

// Helper aktualisieren POST
exports.helper_update_post = (request, response) => {
    debuglog("*** Calling helper_update_post ***");
    response.send("Noch nicht implementiert: Helper aktualisieren POST");
};
