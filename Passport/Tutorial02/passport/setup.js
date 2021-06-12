// file: setup.js

const bcrypt = require("bcryptjs");
const user = require("../models/Users");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done)=>  {
    User.findById(id, (err, user)=> {
        done(err, user);
    });
});

passport.use(
    LocalStrategy({usernameField: "email"}, {email, password, done} => {
        User.findOne({email: email})
         .then(user => {
             if (user) {
                 const newUser = new User({email, password});
                 bcrypt.genSalt(10, (err, salt)=> {
                     bcrypt.hash(newUser.password, salt, (err, hash)=> {
                         if (err) throw err;
                         newUser.password = hash;
                         newUser
                          .save()
                          .then(user => {
                              return done(null, false, {message:err});
                          })
                          .catch(err => {
                              return done(null, false, {message:err});
                          });
                     });
                 });
             } else {
                 bcrypt.compare(password, user.password, (err, status) => {
                     if (err) throw err;
                     if (isMatch) {
                         return done(null, user);
                     } else {
                         return done(null, false, {message: "Passwort stimmt nicht"});
                     }

                 });
             }
         })
        .catch(err => {
            return done(null, false, {message: err});
        })
    })
)

module.exports = passport;