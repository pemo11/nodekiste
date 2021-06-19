// file: moduleController.js

var Module = require("../models/module");
var Async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");

// Liste von Modulen anzeigen (Liste kann theoretisch sehr groß werden)
exports.module_list = (request, response, next) => {
    debuglog("*** Calling module_list ***");
    Module.find({}, "name")
     .exec((err, list_module) => {
        if(err) { return next(err);}
        response.render("module_list", {title: "Alle Module", module_list: list_module});
     });
};

// Details zu einem Module anzeigen
exports.module_detail = (request, response, next) => {
    debuglog("*** Calling module_detail ***");

    async.parallel({
        module: (callback) => {
            Module.findById(request.params.id)
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.helper == null){
            var err = new Error("Module nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("module_detail", {title:"Details zu einem Module", module: result.module});
    });
};

// Formular für das Anlegen eines Moduls anzeigen
exports.module_create_get = (request, response) => {
    debuglog("*** Calling module_create_get ***");
    response.send("Noch nicht implementiert: Modul anlegen GET");
};

// Modul anlegen POST 
exports.module_create_post = (request, response) => {
    debuglog("*** Calling module_create_post ***");
    response.send("Noch nicht implementiert: Modul anlegen POST");
};

// Formular für das Löschen eines Moduls anzeigen
exports.module_delete_get = (request, response) => {
    debuglog("*** Calling module_delete_get ***");
    response.send("Noch nicht implementiert: Module löschen GET");
};

// Module delete POST
exports.module_delete_post = (request, response) => {
    debuglog("*** Calling Module_delete_post ***");
    response.send("Noch nicht implementiert: Module löschen POST");
};

// Formular für das Aktualisieren eines Moduls anzeigen
exports.module_update_get = (request, response) => {
    debuglog("*** Calling module_update_get ***");
    response.send("Noch nicht implementiert: Modul aktualisieren GET");
};

// Modul aktualisieren POST
exports.module_update_post = (request, response) => {
    debuglog("*** Calling module_update_post ***");
    response.send("Noch nicht implementiert: Module aktualisieren POST");
};
