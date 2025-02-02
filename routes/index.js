const router = require("express").Router();
const authRoutes = require("./auth.routes");
const animeRoutes = require("./anime.routes");
const watchlistRoutes = require("./watchlist.routes");
const reviewRoutes = require("./review.routes");
const searchHistoryRoutes = require("./search.history.routes");

router.use("/auth", authRoutes);
router.use("/animes", animeRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/reviews", reviewRoutes);
router.use("/history", searchHistoryRoutes);

module.exports = router;
