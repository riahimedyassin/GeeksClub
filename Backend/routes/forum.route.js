const router = require("express").Router();
const {
  addForum,
  subscribe,
  unsubscribe,
  sendMessage,
  sendReply,
  getAllForums
} = require("../controllers/forum.controller");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");
const {requireAdminAuth} = require("../middlewares/auth/admin.auth")

router.post("/",requireAdminAuth ,addForum);
router.use(requireMemberAuth);
router.get("/",getAllForums)
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.post("/articles/:forum", sendMessage);
router.post("/articles/:forum/:message", sendReply);
module.exports = router;
