// file: auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("register_login", (request, response, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return response.status(400).json({errors: err});
        }
        if (!user) {
            return response.status(400).json({errors: "Keine Users gefunden"});
        }
        request.login(user, (err)=> {
            if (err) {
                return response.status(400).json({errors: err});
            }
            return response.status(200).json({"success": `User ${user} wurde angemeldet!`});

        });
    })(request, response, next);
});

module.exports = router;