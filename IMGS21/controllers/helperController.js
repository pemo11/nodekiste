// file: helperController.js

// TODO: 21/06/21 - das Anlegen eines Helpers ist noch mitten in der umsetzung
// Was noch nicht geht, ist die Zuordnung von creator und course zu der objectId
// Außerdem sollten die Felder mit den möglichen Werten vorbelegt sein - eventuell löst das auch das Problem
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms/Create_book_form
// Das ist noch eine Hürde, wenn ich die genommen habe und die Anmeldung funktioniert, erst dann soll das Anlegen
// eines Helpers möglich sein, geht es direkt mit den PWA weiter, so dass ich dei App Ende Juni deployen kann
// dann habe ich noch 4 Tage

var Helper = require("../models/helper");
const {body,validationResult } = require("express-validator");
var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Liste von helpern anzeigen (Liste kann theoretisch sehr groß werden)
exports.helper_list = (request, response, next) => {
    debuglog("*** Helper Controller - calling helper_list ***");
    Helper.find({}, "title")
     .exec((err, list_helper) => {
        if(err) { return next(err);}
        response.render("helper_list", {title: "Alle Helper", helper_list: list_helper});
     });
};

// Details zu einem Helper anzeigen
exports.helper_detail = (request, response, next) => {
    debuglog("*** Helper Controller - calling helper_detail ***");

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
        response.render("helper_detail", {title: "Details zu einer Lernhilfe", helper: results.helper});
    });
};

// Formular für das Anlegen eines Helpers anzeigen
exports.helper_create_get = (request, response) => {
    debuglog("*** Helper Controller - calling helper_create_get ***");
    response.render("helper_form", {title: "Anlegen eines Helpers"});
};

// Helper anlegen POST 
exports.helper_create_post = [

    body("title").trim().isLength({min:1}).escape().withMessage("Der Titel muss angegeben werden."),

    (request, response, next) => {
        debuglog("*** Helper Controller - calling helper_create_post ***");

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.render("helper_form", {title: "Anlegen eines Helpers", helper:request.body, errors: errors.array()} );
            return;
        } else {
            var helper = new Helper({
                title: request.body.title,
                source: request.body.source,
                course: request.body.course,
                author: request.body.author,
                ratings: request.body.ratings,
                creator: request.body.creator

            });
            helper.save(err => {
                if (err) {return next(err);}
                response.redirect(helper.url);
            });
        }
    }
];

// Formular für das Löschen eines Helpers anzeigen
exports.helper_delete_get = (request, response) => {
    debuglog("*** Helper Controller - calling helper_delete_get ***");
    response.send("Noch nicht implementiert: Helper löschen GET");
};

// Helper delete POST
exports.helper_delete_post = (request, response) => {
    debuglog("*** Helper Controller - calling helper_delete_post ***");
    response.send("Noch nicht implementiert: Helper löschen POST");
};

// Formular für das Aktualisieren eines Helpers anzeigen
exports.helper_update_get = (request, response) => {
    debuglog("*** Helper Controller - calling helper_update_get ***");
    response.send("Noch nicht implementiert: Helper aktualisieren GET");
};

// Helper aktualisieren POST
exports.helper_update_post = (request, response) => {
    debuglog("*** Helper Controller - calling helper_update_post ***");
    response.send("Noch nicht implementiert: Helper aktualisieren POST");
};
