const {
  getAllArticles,
  getSingleArticle,
  addNewArticle,
} = require("../controllers/article.controller");

const router = require("express").Router();
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);
router.post("/", requireAdminAuth, addNewArticle);

module.exports = router;
