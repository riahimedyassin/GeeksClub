const {
  registerUser,
  loginMember,
  recoverAccount,
  getSingleMember,
  updateMember,
  getInfo,
  getAllMembers,
  deleteMember,
  getAllRegistred,
  registerMember,
  getImageSignature,
  uploadMemberImage,
  getMembersCount
} = require("../controllers/member.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginMember);
router.post("/recover", recoverAccount); 


router.get("/all/:page", requireAdminAuth, getAllMembers);
router.post("/add/:id", requireAdminAuth, registerMember);
router.get("/registered/all",requireAdminAuth, getAllRegistred);
router.delete("/:id",requireAdminAuth, deleteMember);
router.get("/:id",requireAdminAuth,getSingleMember)


router.get("/me/info",requireMemberAuth,getInfo)
router.patch("/me",requireMemberAuth,updateMember)
router.get("/me/image/signature/:folderName",getImageSignature)
router.post('/me/image',requireMemberAuth,uploadMemberImage)
router.get('/all/members/length',requireAdminAuth,getMembersCount)



module.exports = router;
