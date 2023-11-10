const router = require("express").Router();
const {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
  confirmParticipation,
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin
} = require("../controllers/admin.controller");
const { getAllForums } = require("../controllers/forum.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.post('/register',registerAdmin)
router.post('/login',adminLogin)


//REQUIRE ADMIN
router.use(requireAdminAuth)
router.get("/forums",getAllForums)
router.get("/member/all/:page", getAllMembers);
router.post("/members/add", registerMember);
router.get("/user/all", getAllRegistred);
router.delete("/members/:id", deleteMember);
router.post("/members/confirm",confirmParticipation)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)




module.exports = router;
