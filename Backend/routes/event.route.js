const {
  getAllEvents,
  getEventByCategorie,
  addEvents,
  getSingleEvent,
  updateEvent,
  endEvent,
  getFeaturedEvents
} = require("../controllers/event.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.get("/featured",getFeaturedEvents)
router.use(requireMemberAuth)
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.get("/categorie/:categorie",getEventByCategorie);

//REQUIRE ADMIN 
router.use(requireAdminAuth)
router.post("/",addEvents)
router.patch("/:id",updateEvent)
router.delete("/:id",endEvent)

module.exports = router;
