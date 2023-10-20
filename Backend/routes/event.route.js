const {
  getAllEvents,
  getEventByCategorie,
  addEvents,
  getSingleEvent,
  updateEvent,
  endEvent,
} = require("../controllers/event.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");

const router = require("express").Router();

router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.get("/categorie/:categorie",getEventByCategorie);

//REQUIRE ADMIN 
router.use(requireAdminAuth)
router.post("/",addEvents)
router.patch("/:id",updateEvent)
router.delete("/:id",endEvent)

module.exports = router;
