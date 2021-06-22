// file: catalog.js

var express = require("express");
var router = express.Router();

// Erforderliche Controller-Module
var faculty_controller = require("../controllers/facultyController");
var syllabus_controller = require("../controllers/syllabusController");
var course_controller = require("../controllers/courseController");
var helper_controller = require("../controllers/helperController");

// const Syllabus = require("../models/syllabus");

// Die Syllabus Routes
router.get("/", syllabus_controller.index);

// Get für alle Syllabuse
router.get("/syllabuses", syllabus_controller.syllabus_list);

// Get für einen Syllabus
router.get("/syllabus/:id", syllabus_controller.syllabus_detail);

// syllabus create
router.get("/syllabus/create", syllabus_controller.syllabus_create_get);
router.post("/syllabus/create", syllabus_controller.syllabus_create_post);

// syllabus delete
router.get("/syllabus/delete", syllabus_controller.syllabus_delete_get);
router.post("/syllabus/delete", syllabus_controller.syllabus_delete_post);

// syllabus update
router.get("/syllabus/update", syllabus_controller.syllabus_update_get);
router.post("/syllabus/update", syllabus_controller.syllabus_update_post);

// Faculties ROUTES

// Get für alle Fakultäten
router.get("/faculties", faculty_controller.faculty_list);

// Get für eine Fakultät
router.get("/faculty/:id", faculty_controller.faculty_detail);

// Course ROUTES
router.get("/courses", course_controller.course_list);

// Course create
router.get("/course/create", course_controller.course_create_get);
router.post("/course/create", course_controller.course_create_post);

// Course delete
router.get("/course/delete", course_controller.course_delete_get);
router.post("/course/delete", course_controller.course_delete_post);

// Course update
router.get("/course/update", course_controller.course_update_get);
router.post("/course/update", course_controller.course_update_post);

// Course Get
router.get("/course/:id", course_controller.course_detail);

// Helper Routes
router.get("/helpers", helper_controller.helper_list);

// Helper create
router.get("/helper/create/:id", helper_controller.helper_create_get_courseId);
router.post("/helper/create/:id", helper_controller.helper_create_post_courseId);

router.get("/helper/create", helper_controller.helper_create_get);
router.post("/helper/create", helper_controller.helper_create_post);

// Get für einen Helper
router.get("/helper/:id", helper_controller.helper_detail);

// Helper delete
router.get("/helper/delete", helper_controller.helper_delete_get);
router.post("/helper/delete", helper_controller.helper_delete_post);

// Helper update
router.get("/helper/update", helper_controller.helper_update_get);
router.post("/helper/update", helper_controller.helper_update_post);

module.exports = router;
