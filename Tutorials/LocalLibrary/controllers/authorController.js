// file: authorController.js

var Author = require("../models/author");

// Liste von Autoren anzeigen
exports.author_list = (request, response) => {
    response.send("Noch nicht implementiert: Autorenliste");
};

// Details zu einem Autor anzeigen
exports.author_detail = (request, response) => {
    response.send("Noch nicht implementiert: Autordetails");
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



