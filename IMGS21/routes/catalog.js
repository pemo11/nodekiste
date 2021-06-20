// file: catalog.js

var express = require("express");
var router = express.Router();

// Erforderliche Controller-Module
var syllabus_controller = require("../controllers/syllabusController");
var course_controller = require("../controllers/courseController");
var helper_controller = require("../controllers/helperController");

const Syllabus = require("../models/syllabus");

// Die Syllabus Routes
router.get("/", syllabus_controller.index);

// Get für alle Syllabuse
router.get("/syllabus", syllabus_controller.syllabus_list);

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

// Course ROUTES
router.get("/courses", course_controller.course_list);

// Course Get
router.get("/course/:id", course_controller.course_detail);

// Course create
router.get("/course/create", course_controller.course_create_get);
router.post("/course/create", course_controller.course_create_post);

// Course delete
router.get("/course/delete", course_controller.course_delete_get);
router.post("/course/delete", course_controller.course_delete_post);

// Course update
router.get("/course/update", course_controller.course_update_get);
router.post("/course/update", course_controller.course_update_post);

// Helper Routes
router.get("/helper", helper_controller.helper_list);

// Get für einen Helper
router.get("/helper/:id", helper_controller.helper_detail);

// Helper create
router.get("/module/create", helper_controller.helper_create_get);
router.post("/module/create", helper_controller.helper_create_post);

// Helper delete
router.get("/helper/delete", helper_controller.helper_delete_get);
router.post("/helper/delete", helper_controller.helper_delete_post);

// Helper update
router.get("/helper/update", helper_controller.helper_update_get);
router.post("/helper/update", helper_controller.helper_update_post);

module.exports = router;
