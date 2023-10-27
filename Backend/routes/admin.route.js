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
router.post("/member/add", registerMember);
router.get("/user/all", getAllRegistred);
router.delete("/member/:id", deleteMember);
router.post("/member/confirm",confirmParticipation)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)




module.exports = router;
