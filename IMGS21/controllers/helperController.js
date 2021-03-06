// file: helperController.js

var Helper = require("../models/helper");
var Course = require("../models/course");
var User = require("../models/user");
const {body,validationResult } = require("express-validator");
var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");
var mongoose = require("mongoose");
const helpers = require("../helpers");
const logger = require("../logger");

// Liste von helpern anzeigen (Liste kann theoretisch sehr groß werden)
exports.helper_list = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] *** Helper Controller - calling helper_list ***`);
    // Die Eigenschaft avatar ist aucg Teil des Helper-Schemas und wird beim Anlegen eines Helpers festgelegt
    Helper.find({}, "title url rating avatar")
     .exec((err, list_helper) => {
        if(err) { return next(err);}
        response.render("helper_list", {title: "Alle Lernhilfen", helper_list: list_helper, isAuthenticated:request.isAuthenticated()});
     });
};

// Details zu einem Helper anzeigen
exports.helper_detail = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] *** Helper Controller - calling helper_detail ***`);

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
        response.render("helper_detail", {title: "Details zu einer Lernhilfe", helper: results.helper,isAuthenticated:request.isAuthenticated()});
    });
};

// Formular für das Anlegen eines Helpers anzeigen
exports.helper_create_get = (request, response) => {
    var courseId = request.locals.courseId;
    debuglog(`[${helpers.getTime()}] - *** Helper Controller - calling helper_create_get with courseId=${courseId} ***`);
    response.render("helper_form", {title: "Anlegen einer Lernhilfe"});
};

// Formular für das Anlegen eines Helpers anzeigen mit CourseId
exports.helper_create_get_courseId = (request, response) => {
    var courseId = request.params.id;
    debuglog(`[${helpers.getTime()}] - *** Helper Controller - calling helper_create_get_courseId mit Id=${courseId} ***`);
    response.render("helper_form", {title: "Anlegen einer Lernhilfe", courseId:courseId});
};

// Formular für das Anlegen eines Helpers anzeigen mit CourseId
exports.helper_create_post_courseId = [

    body("title").trim().isLength({min:1}).escape().withMessage("Der Titel muss angegeben werden."),

    (request, response, next) => {
        debuglog(`[${helpers.getTime()}] - *** Helper Controller - calling helper_create_post_courseId ***`);

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.render("helper_form", {title: "Anlegen einer Lernhilfe", helper:request.body, errors: errors.array()} );
            return;
        } else {
            // Alle Daten aus dem Helper Anlegen-Formular holen
            var courseTitle = request.body.course;
            var creatorName = request.body.creator;
            var creatorId = request.user.id;
            var courseId = request.body.courseId;
            debuglog(`+++ ${courseTitle} +++`)
            // Den User finden über den Namen des Creators
            // Geht neben _id auch id?
            User.findOne({name: creatorName}, "_id avatar")
             .then((result) => {
                debuglog(`+++ Helper anlegen - UserId= ${result.id} +++`)
                // Lernhilfe anlegen
                var helper = new Helper({
                    title: request.body.title,
                    source: request.body.source,
                    createDate: Date.now(),
                    course: mongoose.Types.ObjectId(courseId),
                    author: request.body.author,
                    rating: request.body.rating,
                    avatar: request.user.avatar,
                    creator: mongoose.Types.ObjectId(creatorId)
                   });
                helper.save(err => {
                    if (err) {return next(err);}
                    response.redirect(helper.url);
                });
             })
             .catch(err => {
                debuglog(`[${helpers.getTime()}] !!! Fehler bei der Abfrage der CreatorId !!!`);
                if (err) {return next(err);}
            })
        }
    }
];


// Helper anlegen POST 
exports.helper_create_post = [

    body("title").trim().isLength({min:1}).escape().withMessage("Der Titel muss angegeben werden."),

    (request, response, next) => {
        debuglog(`[${helpers.getTime()}] *** Helper Controller - calling helper_create_post ***`);

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
                rating: request.body.rating,
                creator: response.locals.currentUser.id

            });
            helper.save(err => {
                if (err) {return next(err);}
                response.redirect(helper.url);
            });
        }
    }
];

// Helper delete POST
exports.helper_delete_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Helper Controller - calling helper_delete_post ***`);
    var helperId = request.params.id;
    // findByIdAndDelete mit id statt _id
    Helper.findOneAndDelete({_id:helperId})
    .then(()=> {
        debuglog(`[${helpers.getTime()}] - *** Helfer mit id=${helperId} wurde gelöscht ***`);
    })
    .catch((err)=> {
        debuglog(`[${helpers.getTime()}] - !!! Fehler beim Löschen des Helfers mit id=${HelperId} (${err})`);
    });
    response.redirect("/catalog/helper");
};

// Formular für das Aktualisieren eines Helpers anzeigen
exports.helper_update_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Helper Controller - calling helper_update_get ***`);
    response.send("Noch nicht implementiert: Helper aktualisieren GET");
};

// Helper aktualisieren POST
exports.helper_update_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Helper Controller - calling helper_update_post ***`);
    response.send("Noch nicht implementiert: Helper aktualisieren POST");
};

// Helper like inkrementieren
exports.helper_like_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Helper Controller - calling helper_like_post ***`);
    var helperId = request.params.id;
    // debuglog(`*** Like für Helper ${helperId} wurde gezählt ***`);

    // Update mit Increment klappt;)
    // Es kommt auf den Filter an, in diesem Fall _id statt id
    Helper.findOneAndUpdate(
        { _id: helperId },
        { $inc: {rating: 1 }},
        {new: true})
        .then((helperNeu) => {
            debuglog(`[${helpers.getTime()}] *** Ein Like mehr für Helper ${helperNeu} ***`);
        })
        .catch(err => {
            debuglog(`[${helpers.getTime()}] !!! Fehler beim Updaten von ${helperId} ${err.Message} !!!`);
        });
        response.redirect("/catalog/helper");
}