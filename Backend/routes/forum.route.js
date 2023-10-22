const router = require("express").Router();
const {addForum,subscribe,unsubscribe,sendMessage} = require("../controllers/forum.controller")
const {requireMemberAuth} = require("../middlewares/auth/member.auth")

router.use(requireMemberAuth)
router.post("/",addForum)
router.post("/subscribe",subscribe)
router.post("/unsubscribe",unsubscribe)
router.post('/articles/:forum',sendMessage)
module.exports=router