// File: indes.js

const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (request, response) => {
    response.render("form", { title: "Hier Anmeldung"});
});

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
            response.send("Registrierung erfolgreich");
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
