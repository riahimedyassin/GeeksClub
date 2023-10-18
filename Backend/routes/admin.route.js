const router = require("express").Router();
const {
  registerMember,
  getAllRegistred,
  getAllMembers,
  deleteMember,
} = require("../controllers/admin.controller");


//REQUIRE ADMIN

router.get("/member/all/:page", getAllMembers);
router.post("/member/add", registerMember);
router.get("/user/all", getAllRegistred);
router.delete("/member/:id", deleteMember);




module.exports = router;
