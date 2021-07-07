#! /usr/bin/env node

console.log("*** Die Datenbank IMGSS21 wird eingerichtet ***")

const dbCon = "mongodb://localhost:27017/IMGS21"

var async = require("async")
var bcrypt = require("bcrypt")
var User = require("./models/user")
var UserInfo = require("./models/userinfo")
var Faculty = require("./models/faculty")
var Syllabus = require("./models/syllabus")
var Course = require("./models/course")
var Helper = require("./models/helper")

var mongoose = require("mongoose")
var passport = require("passport")
mongoose.connect(dbCon, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
var db = mongoose.connection

const LocalStrategy = require("passport-local").Strategy
passport.use(new LocalStrategy(User.authenticate()))

db.on("error", console.error.bind(console, "!!! Fehler beim Herstellen der MongoDB-Connection !!!"))

var users = []
var userInfos = []
var faculties = []
var syllabuses = []
var courses = []
var helpers = []
var saltRounds = 4;

function userCreate(name, email, cb) {

    var newUser = new User({username: name, email: email})
    User.register(newUser, "omi21", (err, user) => {
        if (err) {
            console.log(`!!! Fehler beim Regstrieren von User ${name} (${err.message}) !!!!`)
            cb(err, null)
        } else {
            console.log(`*** User ${user.username} wurde von Passport-Local registriert ***`)
            users.push(user)
            cb(null, user)
        }
    })

    /*
    bcrypt.hash("omi21", saltRounds, (err, hash) => {
        // Wie wird der salt gebildet?
        // Mongo-connect legt im Rahmen der register-Function automatisch auch einen Salt an
        userDetail = {
            username: name,
            email: email,
            hash: hash,
            salt: salt,
            createDate: Date.now(),
        };

        var user = new User(userDetail);

        user.save((err) => {
            if (err) {
             cb(err, null)
             return
            }
            console.log("Neuer User: " + user);
            users.push(user)
            cb(null, user)
        });
    });
    */    
}

/*
/ Aufruf der register-Methode von local passport
    User.register(new User({
        username: request.body.username,
        password: request.body.password,
        }), request.body.password, (err, user) => {
            if (err) {
                console.log("!!! Fehler in register-Route: " + err.message + "!!!");
                response.redirect("/register");
            } else {
                console.log("*** Registration was good ***");
                passport.authenticate("local", (err,user,info) => {
                    console.log("*** Inside the authenticate callback ***");
                    if (err) {
                        return next(err);
                    }
                    response.redirect("/login");
                })(request, response, next);
            }
        });
*/

function userInfoCreate(user, fullname, city, country, gender, faculty, syllabus, avatar, birthdate, cb) {

    userInfoDetail = {
        user: user,
        fullname: fullname,
        city: city,
        country: country,
        gender: gender,
        faculty: faculty,
        syllabus: syllabus,
        avatar: avatar,
        birthdate: birthdate
    };

    var userInfo = new UserInfo(userInfoDetail);

    userInfo.save((err) => {
        if (err) {
        cb(err, null)
        return
        }

        console.log("Neuer Userinfo: " + userInfo);
        userInfos.push(userInfo)
        cb(null, userInfo)
    });    

}

function facultyCreate(title, alias, city, country, cb) {

    facultyDetail = {
        title: title,
        alias: alias,
        city: city,
        country: country,
    }
    var faculty = new Faculty(facultyDetail);

    faculty.save((err) => {
        if (err) {
          cb(err, null)
          return
        }
    
        console.log("Neue Fakultät: " + faculty);
        faculties.push(faculty)
        cb(null, faculty)
    });
    
}

function syllabusCreate(title, alias, faculty, cb) {
  syllabusDetail = {
      title: title,
      alias: alias,
      faculty: faculty,
  };

  var syllabus = new Syllabus(syllabusDetail);
       
  syllabus.save((err) => {
    if (err) {
      cb(err, null)
      return
    }

    console.log("Neuer Syllabus: " + syllabus);
    syllabuses.push(syllabus)
    cb(null, syllabus)
  });
}

function courseCreate(title, description, alias, semester, syllabus, cb) {
    courseDetail = { 
        title: title,
        description: description,
        alias: alias,
        semester: semester,
        syllabus: syllabus
    };
  
    var course = new Course(courseDetail);
       
    course.save( (err) => {
        if (err) {
        cb(err, null);
        return;
    }

    console.log("Neuer Kurs: " + course);
    courses.push(course)
    cb(null, course)
    });
}

function helperCreate(title, source, author, createDate, creator, course, type, comment, cb) {
    helperDetail = { 
        title: title,
        source: source,
        author: author,
        createDate: createDate,
        creator: creator,
        course: course,
        type: type,
        comment: comment,
        ratings: 0,
        avatar: "",
    };
  
    var helper = new Helper(helperDetail);    
    helper.save(function (err) {
        if (err) {
        cb(err, null)
        return
        }
        console.log("Neuer Helper: " + helper);
        helpers.push(helper)
        cb(null, helper)
    });
}

function createUsers(cb) {

    async.series([
        function(callback) {
            userCreate("pemo", "peter.monadjemi@stud.hs-emden-leer.de", callback)
        },
        function(callback) {
            userCreate("percy", "parvical.stewarti@stud.hs-emden-leer.de", callback)
        },
        function(callback) {
            userCreate("susi", "susanne.moosmann@girlschools-pomonoa.edu", callback)
        }],
        // optional callback
        cb);
}

function createUserInfos(cb) {
    async.series([
        function(callback) {
            userInfoCreate(users[0], "Peter Monadjemi", "Esslingen", "Deutschland", "m", "HS Emden", "OMI", "", "1984/04/01", callback)
        },
        function(callback) {
            userInfoCreate(users[1], "Percy Stewart", "Hamburg Harburg", "Deutschland", "m", "FH Lübeck", "OOP", "", "1955/06/20", callback)
        },
        function(callback) {
            userInfoCreate(users[2], "Susi Sailer", "Oberammergau", "Deutschland", "w", "Kempten", "1. FC RKI", "", "1990/09/12", callback)
        }],
        // optional callback
        cb);
}

function createFaculties(cb) {
    async.series([
        function(callback) {
            facultyCreate("Hochschule Emden-Leer", "HS-EL", "Emden", "Deutschland", callback);
        }],
    // optional callback
    cb);
}

function createSyllabuses(cb) {
    async.series([
        function(callback) {
            syllabusCreate("Online Medieninformatik", "OMI", faculties[0], callback);
        },
        function(callback) {
            syllabusCreate("Online Wirtschaftsinformatik", "OWI", faculties[0], callback);
        }],
        // optional callback
        cb);
}

function createCourses(cb) {
    async.parallel([
        function(callback) {
          courseCreate("Einführung in die Informatik", "Grundlagen der Informatik", "EI", "WS 20/21", syllabuses[0], callback);
        },
        function(callback) {
            courseCreate("Grundlagen der Programmierung 1", "Einführung in die Java-Programmierung", "GP1", "WS 20/21", syllabuses[0], callback);
        },
        function(callback) {
            courseCreate("Grundlagen der Programmierung 2", "Java-Programmierung für Fortgeschrittene", "GP2", "WS 20/21", syllabuses[0], callback);
        },
        ],
        // optional callback
        cb);
}

function createHelpers(cb) {
    async.parallel([
        function(callback) {
          helperCreate("Informatik für Doofe","Bücherschrank", "Charles M. Schultz", "2021/06/21", users[0], courses[0],"YouTube","Super!!!", callback);
        },
        function(callback) {
            helperCreate("Informatik für besonders Doofe","Bücherkiste 2", "Arthur Doyle", "2020/10/03", users[1], courses[0],"YouTube","Einfach genial", callback);
          },
        function(callback) {
            helperCreate("Informatik für extrem Doofe","Bücherkiste 2A", "Mark Twain", "2021/06/21", users[2], courses[2],"YouTube", "Einfach klasse", callback);
          },
        function(callback) {
            helperCreate("Informatik für Schüchterne","Bücherstrand", "Timothy Chandler", "2020/06/21", users[1], courses[1],"YouTube","Hammerhart", callback);
        },
        function(callback) {
            helperCreate("Programmieren supereinfach","Lernmalwas", "Otto Waalkes", "2021/05/21", users[0], courses[0],"YouTube","Irgendwie lustig", callback);
        },
        function(callback) {
           helperCreate("Alles mal ganz anders", "Wissenskahn", "Charles Dickens", "2019/08/11", users[0], courses[0],"YouTube","Kurz und gut", callback);
         },
        function(callback) {
            helperCreate("Informatik für total Untalentierte", "Wüste der Ödnis", "Stephen Kink", "2020/11/19", users[0], courses[0],"YouTube","Spannend bis zum Schluss", callback);
          }],
        // Optional callback
        cb);
}

// Der Reihe nach ausführen
async.series([
    createUsers,
    createUserInfos,
    createFaculties,
    createSyllabuses,
    createCourses,
    createHelpers
],

// Optionaler callback für das Finale
function(err, results) {
    if (err) {
        console.log(`!!! Am Ende trat ein Fehler auf: ${err} !!!`);
    }
    else {
        console.log(`*** Angelegte User: ${users.length} ***`);
        console.log(`*** Angelegte UserInfos: ${userInfos.length} ***`);
        console.log(`*** Angelegte Fakultäten: ${faculties.length} ***`);
        console.log(`*** Angelegte Studiengänge: ${syllabuses.length} ***`);
        console.log(`*** Angelegte Kurse: ${courses.length} ***`);
        console.log(`*** Angelegte Helpers: ${helpers.length} ***`);
    }

    // Alles erledigt, Verbindung schließen
    mongoose.connection.close();
});
