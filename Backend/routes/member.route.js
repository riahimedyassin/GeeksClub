const { registerUser } = require('../controllers/member.controller')

const router = require('express').Router()



router.post("/register",registerUser)



module.exports=router