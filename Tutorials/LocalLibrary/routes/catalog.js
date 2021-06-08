// file: catalog.js

var express = require("express");
var router = express.Router();

// Erforderliche Controller-Module
var book_controller = require("../controllers/bookController");
var author_controller = require("../controllers/authorController");
var genre_controller = require("../controllers/genreController");
var book_instance_controller = require("../controllers/bookinstanceController");
const book = require("../models/book");

// Die BOOK Routes
router.get("/", book_controller.index);

// Get für alle books
router.get("/books", book_controller.book_list);

// Get für ein book
router.get("/book/:id", book_controller.book_detail);

// book create
router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);

// book delete
router.get("/book/delete", book_controller.book_delete_get);
router.post("/book/delete", book_controller.book_delete_post);

// book update
router.get("/book/update", book_controller.book_update_get);
router.post("/book/update", book_controller.book_update_post);

// GENRE ROUTES

// Get für alle genres
router.get("/genres", genre_controller.genre_list);

// Get für ein genre
router.get("/genre/:id", genre_controller.genre_detail);

// genre create
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);

// genre delete
router.get("/genre/delete", genre_controller.genre_delete_get);
router.post("/genre/delete", genre_controller.genre_delete_post);

// genre update
router.get("/genre/update", genre_controller.genre_update_get);
router.post("/genre/update", genre_controller.genre_update_post);

// BOOKINSTANCE ROUTES
router.get("/bookinstances", book_instance_controller.bookinstance_list);

// bookinstance create
router.get("/bookinstance/create", book_instance_controller.bookinstance_create_get);
router.post("/bookinstance/create", book_instance_controller.bookinstance_create_post);

// bookinstance delete
router.get("/bookinstance/delete", book_instance_controller.bookinstance_delete_get);
router.post("/bookinstance/delete", book_instance_controller.bookinstance_delete_post);

// bookinstance update
router.get("/bookinstance/update", book_instance_controller.bookinstance_update_get);
router.post("/bookinstance/update", book_instance_controller.bookinstance_update_post);

// AUTHOR ROUTES
router.get("/authors", author_controller.author_list);

// author create
router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);

// author delete
router.get("/author/delete", author_controller.author_delete_get);
router.post("/author/delete", author_controller.author_delete_post);

// author update
router.get("/author/update", author_controller.author_update_get);
router.post("/author/update", author_controller.author_update_post);

module.exports = router;
