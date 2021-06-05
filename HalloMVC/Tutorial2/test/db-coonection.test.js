// file: db-coonection.test.js

require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const mongoose = require("mongoose");
const { testEnvironment } = require("../jet.config");
const ArticleService = require("../services/articleservice");

describe("Connection", () => {
    beforeAll(async() => {
        await mongoose.connect(process.env.mongoDbConStr, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology:true,
        })
    });

    test("Retrieve article by Id", async () => {
        const id="60ba82681ca1ae3d78afb415";
        const article = await ArticleService.getArticleById(id);
        expect(article.title).toBe("Blog Post Nr. 1");
    });

    afterAll(async (done) => {
        mongoose.disconnect();
        done();
    });
});