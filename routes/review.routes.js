const router = require("express").Router();
const ReviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/anime/:animeId", ReviewController.getAnimeReviews);
router.post("/", verifyToken, ReviewController.createReview);
router.put("/:id", verifyToken, ReviewController.updateReview);
router.delete("/:id", verifyToken, ReviewController.deleteReview);

module.exports = router;
