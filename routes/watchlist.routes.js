const router = require("express").Router();
const WatchlistController = require("../controllers/watchlist.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, WatchlistController.getWatchlist);
router.post("/", verifyToken, WatchlistController.addToWatchlist);
router.put("/:id", verifyToken, WatchlistController.updateWatchlist);
router.delete("/:id", verifyToken, WatchlistController.removeFromWatchlist);
router.get("/stats", verifyToken, WatchlistController.getStats);

module.exports = router;
