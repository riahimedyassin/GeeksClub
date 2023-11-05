const router = require("express").Router();
const {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
  confirmParticipation,
  changeInfo,
  getAdminInfo
} = require("../controllers/admin.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");


//REQUIRE ADMIN
router.use(requireAdminAuth)
router.get("/member/all/:page", getAllMembers);
router.post("/members/add", registerMember);
router.get("/user/all", getAllRegistred);
router.delete("/members/:id", deleteMember);
router.post("/members/confirm",confirmParticipation)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)




module.exports = router;
