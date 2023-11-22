const router = require('express').Router();
const {addVisitor,getVisitors, blockUser, retrieveUser,blockedList} = require("../controllers/visitor.controller");
const { requireAdminAuth } = require('../middlewares/auth/admin.auth');



router.post("/",addVisitor); 
router.get("/",requireAdminAuth,getVisitors); 
router.post('/block',requireAdminAuth , blockUser)
router.post('/retrieve',requireAdminAuth , retrieveUser)
router.get('/blocked',blockedList)


module.exports= router 