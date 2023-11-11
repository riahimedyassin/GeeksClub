const {
  registerUser,
  attendEvent,
  getLeaderboard,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  imageUpload,
  getUserEvents
} = require("../controllers/member.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginMember);
router.post("/recovery", recoverAccount);
router.post('/image',imageUpload)



router.use(requireMemberAuth);
router.get("/me",getInfo)
router.patch("/me",updateMember)
router.get("/:id",requireAdminAuth,getSingleMember)


module.exports = router;
