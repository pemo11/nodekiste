// File: index.js

const express = require("express");
const mongoose = require("mongoose");
const {check, validationResult} = require("express-validator");

const router = express.Router();
const Registration = mongoose.model("Registration");

const path = require("path");
const auth = require("http-auth");
const basic = auth.basic({
    file: path.join(__dirname, "../users.htpasswd"),
});

router.get("/", (request, response) => {
    response.render("form", { title: "Hier Anmeldung"});
});

router.get("/registrations", basic.check((request, response) => {
    Registration.find()
     .then((registrations) => {
        response.render("index", {"title": "Alle Anmeldungen", registrations});
     })
     .catch(()=> { response.send("Hhmm, irgendetwas ging jetzt wieder mal total daneben");});
}));

// router.post("/", (request, response) => {
router.post(
    "/",
    [
        check("name")
         .isLength({min:1})
         .withMessage("Bitte einen Namen eingeben"),
         check("email")
         .isLength({min:1})
         .withMessage("Bitte eine E-Mail-Adresse eingeben")
    ],
    (request, response) => {
        console.log(request.body);
        const errors = validationResult(request);
        if (errors.isEmpty()){
            const registration = new Registration(request.body);
            registration.save()
             .then(()=> { response.send("Registrierung war überaus erfolgreich"); })
             .catch((err)=> {
                 console.log("Fehler:" + err);
                 response.send("Hmmh, irgendetwas lief falsch?");
             });
        } else {
            response.render("form",
            {
                title: "Hier Anmeldung",
                errors: errors.array(),
                data: request.body,
            });
        }
    }    
);

module.exports = router;
