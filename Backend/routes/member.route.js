const { registerUser,attendEvent,getLeaderboard } = require('../controllers/member.controller')

const router = require('express').Router()



router.post("/register",registerUser)
router.post("/events/participate/:id",attendEvent)
router.get("/leaderboard",getLeaderboard)


module.exports=router