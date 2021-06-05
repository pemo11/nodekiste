// file: articleRoute.js

const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/articleController");

router.get("/", ArticleController.getAllArticles);
router.post("/", ArticleController.createArticle);
// Bsp. http://localhost:8008/article/60ba82681ca1ae3d78afb415
router.get("/article/:id", ArticleController.getArticleById);
router.put("/article/:id", ArticleController.updateArticle);
router.delete("/article/:id", ArticleController.deleteArticle);

module.exports = router;