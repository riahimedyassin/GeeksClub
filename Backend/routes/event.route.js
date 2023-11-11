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
  getLeaderboard,
  confirmParticipation
} = require("../controllers/event.controller");
const { requireAdminAuth } = require("../middlewares/auth/admin.auth");
const { requireMemberAuth } = require("../middlewares/auth/member.auth");
const {isAuth} = require("../middlewares/auth/isAuth")

const router = require("express").Router();

router.get("/featured",getFeaturedEvents)

router.get("/",isAuth, getAllEvents);
router.get('/leaderboard',isAuth,getLeaderboard)
router.get('/list/me',isAuth,getUserEvents)
router.post('/comments/:id',requireMemberAuth,addComment)
router.get("/:id",isAuth, getSingleEvent);
router.get("/categorie/:categorie",isAuth,getEventByCategorie);
router.post("/participate/:id",requireMemberAuth, attendEvent);
router.post('/quit/:id',requireMemberAuth,quitEvent)
router.post("/confirm/:id",requireAdminAuth,confirmParticipation)


//REQUIRE ADMIN 
router.use(requireAdminAuth)
router.post("/",addEvents)
router.patch("/:id",updateEvent)
router.delete("/:id",endEvent)

module.exports = router;
