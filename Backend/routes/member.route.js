const { registerUser,attendEvent } = require('../controllers/member.controller')

const router = require('express').Router()



router.post("/register",registerUser)
router.post("/events/participate/:id",attendEvent)


module.exports=router