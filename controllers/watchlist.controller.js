const WatchlistModel = require("../models/watchlist.model");
const response = require("../utils/response.util");

const WatchlistController = {
    getWatchlist: async (req, res) => {
        try {
            const watchlist = await WatchlistModel.getByUser(req.userId);
            response.success(res, watchlist);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch watchlist");
        }
    },

    addToWatchlist: async (req, res) => {
        try {
            const { animeId, status } = req.body;
            const id = await WatchlistModel.create(req.userId, animeId, status);
            response.success(res, { id }, "Anime added to watchlist", 201);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to add to watchlist");
        }
    },

    updateWatchlist: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const success = await WatchlistModel.update(id, req.userId, status);

            if (!success) {
                return response.error(res, "Watchlist entry not found", 404);
            }

            response.success(res, null, "Watchlist updated successfully");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to update watchlist");
        }
    },

    removeFromWatchlist: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await WatchlistModel.delete(id, req.userId);

            if (!success) {
                return response.error(res, "Watchlist entry not found", 404);
            }

            response.success(res, null, "Removed from watchlist");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to remove from watchlist");
        }
    },

    getStats: async (req, res) => {
        try {
            const stats = await WatchlistModel.getStats(req.userId);
            response.success(res, stats);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch watchlist stats");
        }
    },
};

module.exports = WatchlistController;
