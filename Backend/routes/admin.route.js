const router = require("express").Router();
const {
  confirmParticipation,
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,

} = require("../controllers/admin.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.post('/login',adminLogin)


//REQUIRE ADMIN
router.use(requireAdminAuth)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)
router.post('/register',registerAdmin)




module.exports = router;
