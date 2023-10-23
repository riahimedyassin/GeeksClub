const {
  registerUser,
  attendEvent,
  getLeaderboard,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo
} = require("../controllers/member.controller");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginMember);
router.post("/recovery", recoverAccount);

router.use(requireMemberAuth);
router.post("/events/participate/:id", attendEvent);
router.get("/leaderboard", getLeaderboard);
router.get("/:id",getSingleMember)
router.get("/me",getInfo)
router.patch("/me",updateMember)

module.exports = router;
