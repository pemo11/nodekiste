// file: articleservice.js

const Article = require("../models/article");

module.exports = {
    
    async getAllArticles() {
        console.log("*** Calling getAllArticles ***");
        try {
            const allArticles = await Article.find();
            return allArticles;
        } catch(err) {
            console.log(`!!! Es konnten leider keine Artikel gefetched werden ${err} !!!`);
        }
    },

    async createArticle(data) {
        console.log("*** Calling createArticle ***");
        try {
            const newArticle = {
                title: data.title,
                body: data.body,
                article_image: data.article_image,
            }
            const response = await new Article(newArticle).save();
            return response;
        } catch(err) {
            console.log(`!!! Es konnte leider kein Artikel angelegt werden ${err} !!!`);
        }
    },

    async getArticleById(articleId) {
        console.log("*** Calling getAllArticleById ***");
        try {
            const singleArticleResponse = await Article.findById({_id:articleId});
            return singleArticleResponse;
        } catch(err) {
            console.log(`!!! Artikel mit Id=${articleId} nicht gefunden ${err} !!!`);
        }
    },

    async updateArticle(articleId, title, body, articleImage) {
        console.log("*** Calling updateArticle ***");
        try {
            console.log(`+++ _id: ${articleId} title=${title} +++`)
            const updateResponse = await Article.updateOne(
                {_id:articleId},
                {title:title, body:body, article_image:articleImage},
                {$set: {date: new Date()}});
            return updateResponse;
        } catch(err) {
            console.log(`!!! Artikel konnte leider nicht geupdated werden ${err} !!!`);
        }
    },

    async deleteArticle(articleId) {
        console.log("*** Calling deleteArticle ***");
        try {
            const deleteResponse = await Article.findOneAndDelete({_id:articleId});
            return deleteResponse;
        } catch(err) {
            console.log(`!!! Artikel mit Id=${articleId} kann nicht gelöscht werden ${err} !!!`);
        }
    }

}