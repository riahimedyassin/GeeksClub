const { response } = require("../utils/response/Response");
const Article = require("../models/article.model");
const { createError } = require("../errors/customError");

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    if (articles)
      return response(
        res,
        "Articles retrieved succussfully",
        200,
        false,
        articles
      );
    return next(createError("Cannot retrieve articles", 500));
  } catch (error) {
    next(error);
  }
};
const getSingleArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({ _id: id });
    if (article)
      return response(
        res,
        "Article retrieved successfully",
        200,
        false,
        article
      );
    return next(createError("Cannot find this article", 404));
  } catch (error) {
    next(error);
  }
};
const addNewArticle = async (req, res, next) => {
  const article = req.body;
  if (!article) return next(createError("Please provide an article", 400));
  try {
    const created = await Article.create(article);
    if (article)
      return response(res, "Created Successfully", 200, false, article);
    return next(createError("Cannot create article", 500));
  } catch (error) {
    next(error);
  }
};
const updateArticle = async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const article = await Article.findByIdAndUpdate({ _id: id }, changes);
    if (article) return response(res, "Article updated succussfully", 201);
    return next(createError("Cannot find  this article", 404));
  } catch (error) {
    next(error);
  }
};
const deleteArticle = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndDelete({ _id: id });
    if (article) return response(res, "Article deleted successfully", 204);
    return next(createError("Cannot find this article", 404));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArticles,
  getSingleArticle,
  addNewArticle,
  updateArticle,
  deleteArticle
};
