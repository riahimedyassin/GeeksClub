const router = require("express").Router();
const {
  addForum,
  subscribe,
  unsubscribe,
  sendMessage,
  sendReply,
  getAllForums,
  getSingleForum,
  getUserEvents,
  updateForums,
  deleteForum
} = require("../controllers/forum.controller");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");
const {requireAdminAuth} = require("../middlewares/auth/admin.auth")
const {isAuth} = require('../middlewares/auth/isAuth')


router.get('/',isAuth,getAllForums)
router.get("/:id",isAuth,getSingleForum)
router.post("/subscribe",requireMemberAuth, subscribe);
router.post("/unsubscribe",requireMemberAuth, unsubscribe);
router.get("/user/me",requireMemberAuth,getUserEvents)
router.post("/articles/:forum",requireMemberAuth, sendMessage);
router.post("/articles/:forum/:message",requireMemberAuth, sendReply);

// REQUIRE EADMIN AUTH : 
router.patch('/:id',requireAdminAuth,updateForums)
router.post("/",requireAdminAuth ,addForum);
router.delete("/:id",requireAdminAuth,deleteForum)


module.exports = router;
