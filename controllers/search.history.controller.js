const SearchHistoryModel = require("../models/search.history.model");
const response = require("../utils/response.util");

const SearchHistoryController = {
    getHistory: async (req, res) => {
        try {
            const history = await SearchHistoryModel.getByUser(req.userId);
            response.success(res, history);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to fetch search history");
        }
    },

    deleteHistory: async (req, res) => {
        try {
            const { id } = req.params;

            if (id === "all") {
                await SearchHistoryModel.deleteAll(req.userId);
                return response.success(
                    res,
                    null,
                    "All search history cleared"
                );
            }

            const success = await SearchHistoryModel.delete(id, req.userId);

            if (!success) {
                return response.error(res, "History entry not found", 404);
            }

            response.success(res, null, "History entry deleted");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to delete search history");
        }
    },
};

module.exports = SearchHistoryController;
