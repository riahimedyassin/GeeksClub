const {
  getAllEvents,
  getEventByCategorie,
  addEvents,
  getSingleEvent,
  updateEvent,
  endEvent,
} = require("../controllers/event.controller");

const router = require("express").Router();

router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.get("/categorie/:categorie",getEventByCategorie);

//REQUIRE ADMIN 
router.post("/add",addEvents)
router.patch("/edit/:id",updateEvent)
router.delete("/delete/:id",endEvent)

module.exports = router;
