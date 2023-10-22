const router = require("express").Router();
const {addForum,subscribe,unsubscribe} = require("../controllers/forum.controller")
const {requireMemberAuth} = require("../middlewares/auth/member.auth")

router.use(requireMemberAuth)
router.post("/",addForum)
router.post("/subscribe",subscribe)
router.post("/unsubscribe",unsubscribe)
module.exports=router