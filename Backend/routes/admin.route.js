const router = require("express").Router();
const {
  confirmParticipation,
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,

} = require("../controllers/admin.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.post('/register',registerAdmin)
router.post('/login',adminLogin)


//REQUIRE ADMIN
router.use(requireAdminAuth)


router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)




module.exports = router;
