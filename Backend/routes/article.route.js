const {
  getAllArticles,
  getSingleArticle,
  addNewArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage
} = require("../controllers/article.controller");

const router = require("express").Router();
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);
router.post("/", requireAdminAuth, addNewArticle);
router.patch("/:id",requireAdminAuth , updateArticle)
router.delete('/:id',requireAdminAuth,deleteArticle)
router.post("/image/upload/:id",uploadArticleImage)


module.exports = router;
