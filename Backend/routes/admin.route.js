const router = require("express").Router()
const { registerMember, getAllRegistred, getAllMembers, getAllEvents, getEventByCategorie , addEvents,deleteMember} = require("../controllers/admin.controller")



router.get("/member/all/:page",getAllMembers)
router.post("/member/add",registerMember)
router.get("/user/all",getAllRegistred)
router.delete("/member/:id",deleteMember)

router.get("/events",getAllEvents)
router.post("/events/add", addEvents)
router.get("/events/:categorie",getEventByCategorie)



module.exports=router