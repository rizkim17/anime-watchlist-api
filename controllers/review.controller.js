const ReviewModel = require("../models/review.model");
const response = require("../utils/response.util");

const ReviewController = {
    getAnimeReviews: async (req, res) => {
        try {
            const { animeId } = req.params;
            const reviews = await ReviewModel.getByAnime(animeId);
            response.success(res, reviews);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch reviews");
        }
    },

    createReview: async (req, res) => {
        try {
            const { animeId, rating, content } = req.body;
            const id = await ReviewModel.create(
                req.userId,
                animeId,
                rating,
                content
            );
            response.success(res, { id }, "Review created successfully", 201);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to create review");
        }
    },

    updateReview: async (req, res) => {
        try {
            const { id } = req.params;
            const { rating, content } = req.body;
            const success = await ReviewModel.update(
                id,
                req.userId,
                rating,
                content
            );

            if (!success) {
                return response.error(res, "Review not found", 404);
            }

            response.success(res, null, "Review updated successfully");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to update review");
        }
    },

    deleteReview: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await ReviewModel.delete(id, req.userId);

            if (!success) {
                return response.error(res, "Review not found", 404);
            }

            response.success(res, null, "Review deleted successfully");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to delete review");
        }
    },
};

module.exports = ReviewController;
