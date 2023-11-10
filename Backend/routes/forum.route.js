const router = require("express").Router();
const {
  addForum,
  subscribe,
  unsubscribe,
  sendMessage,
  sendReply,
  getAllForums,
  getSingleForum,
  getUserEvents
} = require("../controllers/forum.controller");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");
const {requireAdminAuth} = require("../middlewares/auth/admin.auth")

router.post("/",requireAdminAuth ,addForum);
router.use(requireMemberAuth);
router.get("/",getAllForums);
router.get("/:id",getSingleForum)
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.get("/user/me",getUserEvents)
router.post("/articles/:forum", sendMessage);
router.post("/articles/:forum/:message", sendReply);
module.exports = router;
