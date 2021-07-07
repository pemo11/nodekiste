// file: facultyController.js

var Faculty = require("../models/faculty");
var Syllabus = require("../models/syllabus");
var Course = require("../models/course");
var Helper = require("../models/helper");

const { body,validationResult } = require("express-validator");
var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Standardroute für die Homepage
exports.index = (request, response) => {
    debuglog("*** Faculty Controller - calling falcuty index ***");

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

        // Wichtig: aggregate verwendet das MongoDB document aus der Datenbank, so dass die virtuellen Properties
        // nicht dabei sind, also z.B, kein url - es gibt aber Lösungen
        // https://stackoverflow.com/questions/30038855/mongoose-virtuals-in-mongodb-aggregate
        helper_top3: (callback) => {
            Helper.aggregate([
                {$sort: {rating: -1}},
                {$limit: 3},
                {$project: {title:1, url:"$_id"}},
                ]).exec(callback);
            },
    }, (err, results)=> {
        var curUser = {username: "Anonymous"};
        if (response.locals != undefined)
        {
            curUser = response.locals.currentUser != undefined ? response.locals.currentUser : {username: "Anonymous"};
            curUser.username = curUser.username.charAt(0).toUpperCase() + curUser.username.slice(1);
        }
        response.render("index", {title: "Studi-Helper 1.0",error: err,data: results, user:curUser, isAuthenticated:request.isAuthenticated()});
    });
};


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
        faculty_syllabuses: (callback) => {
            Syllabus.find({"faculty": request.params.id}, "title url")
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
        response.render("faculty_detail", {title:" Details zu einer Fakultät", faculty: results.faculty, syllabus_list:results.faculty_syllabuses});
    });
};
