const {
  registerUser,
  attendEvent,
  getLeaderboard,
  loginMember,
  recoverAccount,
  getSingleMember
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

module.exports = router;
