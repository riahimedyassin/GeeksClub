const router = require("express").Router();
const {
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,
  deleteAdmin

} = require("../controllers/admin.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.post('/login',adminLogin)


//REQUIRE ADMIN
router.use(requireAdminAuth)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)
router.post('/register',registerAdmin)
router.delete('/:id',deleteAdmin)




module.exports = router;
