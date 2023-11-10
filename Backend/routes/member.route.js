const {
  registerUser,
  attendEvent,
  getLeaderboard,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  imageUpload
} = require("../controllers/member.controller");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginMember);
router.post("/recovery", recoverAccount);
router.post('/image',imageUpload)

router.use(requireMemberAuth);
router.post("/events/participate/:id", attendEvent);
router.get("/leaderboard", getLeaderboard);
router.get("/me",getInfo)
router.get("/:id",getSingleMember)
router.patch("/me",updateMember)

module.exports = router;
