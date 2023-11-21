const router = require('express').Router();
const {addVisitor} = require("../controllers/visitor.controller")



router.post("/",addVisitor); 




module.exports= router 