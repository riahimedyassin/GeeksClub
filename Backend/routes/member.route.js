const {
  registerUser,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  imageUpload,
  getAllMembers,
  deleteMember,
  getAllRegistred,
  registerMember,
  getRecoverQuestion
} = require("../controllers/member.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginMember);
router.post("/recovery/answer", recoverAccount);
router.post('/image',imageUpload) ;
router.get("/recover/question/:id", getRecoverQuestion)


router.get("/all/:page", requireAdminAuth, getAllMembers);
router.post("/add/:id", requireAdminAuth, registerMember);
router.get("/registered/all",requireAdminAuth, getAllRegistred);
router.delete("/:id",requireAdminAuth, deleteMember);
router.get("/:id",requireAdminAuth,getSingleMember)


router.get("/me/info",requireMemberAuth,getInfo)
router.patch("/me",requireMemberAuth,updateMember)



module.exports = router;
