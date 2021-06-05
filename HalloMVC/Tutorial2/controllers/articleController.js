// file: articleController.js

// const { try } = require("bluebird");
const { response } = require("express");
const { getArticleById } = require("../services/ArticleService");
const ArticleService = require("../services/ArticleService");

module.exports = {

    async getAllArticles(request, response, next) {
        try {
            const articles = await ArticleService.getAllArticles();
            if(!articles) {
                response.status(404).json("Es gibt noch keine Artikel");
            }
            response.json(articles);
        } catch (err) {
            response.status(500).json({error: err});
        }
    },

    async getArticleById(request, response, next) {
        try {
            let id = request.params.id || {};
            const article = await ArticleService.getArticleById(id);
            response.json(article);
        } catch(err) {
            response.status(500).json({error: err});
        }
    },

    async createArticle(request, response, next) {
        try {
            const article = await ArticleService.createArticle(request.body);
            response.json(article);
        } catch(err) {
            response.status(500).json({error: err});
        }
    },

    async updateArticle(request, response, next) {
        try {
            const title = request.body.title;
            const body = request.body.body;
            const articleImage = request.body.article_image;

            const article = await ArticleService.updateArticle(title, body, articleImage);
            response.json(article);

        } catch(err) {
            response.status(500).json({error: err});
        }
    },

    async deleteArticle(request, response, next) {
        try {
            let id = request.params.id;
            const deleteResponse = await ArticleService.getArticleById(id);
            response.json(deleteResponse);
        } catch(err) {
            response.status(500).json({error: err});
        }
    }
}