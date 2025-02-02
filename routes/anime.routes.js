const router = require("express").Router();
const AnimeController = require("../controllers/anime.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, AnimeController.getAnimes);
router.get("/trending", verifyToken, AnimeController.getTrending);
router.get("/seasonal", verifyToken, AnimeController.getSeasonal);
router.get("/upcoming", verifyToken, AnimeController.getUpcoming);
router.get("/:id", verifyToken, AnimeController.getAnimeById);

module.exports = router;
