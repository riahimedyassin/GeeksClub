const router = require("express").Router();
const {
  changeInfo,
  getAdminInfo,
  registerAdmin,
  adminLogin,
  deleteAdmin,
  changePassword,
  getAllAdmins,
  uploadAdminImage,
  getSingleAdmin

} = require("../controllers/admin.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

router.post('/login',adminLogin)


//REQUIRE ADMIN
router.use(requireAdminAuth)
router.patch("/me",changeInfo)
router.get("/me",getAdminInfo)
router.post('/register',registerAdmin)
router.delete('/:id',deleteAdmin)
router.patch('/me/password',changePassword)
router.get('/',getAllAdmins)
router.post('/me/image',uploadAdminImage)
router.get('/admin/:id',getSingleAdmin)




module.exports = router;
