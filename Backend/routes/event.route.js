const {
  getAllEvents,
  getEventByCategorie,
  addEvents,
  getSingleEvent,
  updateEvent,
  endEvent,
  getFeaturedEvents,
  getUserEvents,
  addComment,
  attendEvent,
  quitEvent,
  getLeaderboard
} = require("../controllers/event.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");

const router = require("express").Router();

router.get("/featured",getFeaturedEvents)
router.use(requireMemberAuth)
router.get("/", getAllEvents);
router.get('/leaderboard',getLeaderboard)
router.get('/list/me',getUserEvents)
router.post('/comments/:id',addComment)
router.get("/:id", getSingleEvent);
router.get("/categorie/:categorie",getEventByCategorie);
router.post("/participate/:id", attendEvent);
router.post('/quit/:id',quitEvent)



//REQUIRE ADMIN 
router.use(requireAdminAuth)
router.post("/",addEvents)
router.patch("/:id",updateEvent)
router.delete("/:id",endEvent)

module.exports = router;
