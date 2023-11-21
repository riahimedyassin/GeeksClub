const router = require('express').Router();
const {addVisitor,getVisitors} = require("../controllers/visitor.controller");
const { requireAdminAuth } = require('../middlewares/auth/admin.auth');



router.post("/",addVisitor); 
router.get("/",requireAdminAuth,getVisitors); 




module.exports= router 