#! /usr/bin/env node

console.log("*** Die Datenbank IMGSS21 wird eingerichtet ***")

const dbCon = "mongodb://localhost:27017/IMGS21"

var async = require("async")
var User = require("./models/user")
var Faculty = require("./models/faculty")
var Syllabus = require("./models/syllabus")
var Course = require("./models/course")
var Helper = require("./models/helper")

var mongoose = require("mongoose")
mongoose.connect(dbCon, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "!!! Fehler beim Herstellen der MongoDB-Connection !!!"));

var users = []
var faculties = []
var syllabuses = []
var courses = []
var helpers = []

function userCreate(name, email, cb) {
    userDetail = {
        name: name,
        email: email,
        createDate: Date.now
    }

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
        ratings: 0
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
            userCreate("susi", "susi@girlschools-pomonoa.edu", callback)
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
        ],
        // optional callback
        cb);
}

function createHelpers(cb) {
    async.parallel([
        function(callback) {
          helperCreate("Informatik für Doofe","Bücherschrank", "Charles M. Schultz", "2021/06/21", users[0], courses[0],"YouTube","Super,super", callback);
        },
        function(callback) {
            helperCreate("Informatik für besonders Doofe","Bücherkiste 2", "Charles M. Schultz", "2021/06/21", users[0], courses[0],"YouTube","Super,super", callback);
          },
        function(callback) {
            helperCreate("Informatik für extrem Doofe","Bücherkiste 2A", "Charles M. Schultz", "2021/06/21", users[0], courses[0],"YouTube","Super,super", callback);
          },
        function(callback) {
            helperCreate("Informatik für Untalentierte","Regal", "Charles M. Schultz", "2021/06/21", users[0], courses[0],"YouTube","Super,super", callback);
          }],
        // Optional callback
        cb);
}

// Der Reihe nach ausführen
async.series([
    createUsers,
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
        console.log(`*** Angelegte Fakultäten: ${faculties.length} ***`);
        console.log(`*** Angelegte Studiengänge: ${syllabuses.length} ***`);
        console.log(`*** Angelegte Kurse: ${courses.length} ***`);
        console.log(`*** Angelegte Helpers: ${helpers.length} ***`);
    }

    // Alles erledigt, Verbindung schließen
    mongoose.connection.close();
});
