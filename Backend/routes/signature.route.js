const router  = require("express").Router() ;
const {getImageSignature} = require('../controllers/signature.controller');
const { isAuth } = require("../middlewares/auth/isAuth");



router.use(isAuth)
router.get("/:folderName",getImageSignature)


module.exports= router