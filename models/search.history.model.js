const db = require("../config/database");

const SearchHistoryModel = {
    create: async (userId, animeId, searchQuery) => {
        const [result] = await db.execute(
            "INSERT INTO search_history (user_id, anime_id, search_query) VALUES (?, ?, ?)",
            [userId, animeId, searchQuery]
        );
        return result.insertId;
    },

    getByUser: async (userId) => {
        const [rows] = await db.execute(
            `
      SELECT sh.*
      FROM search_history sh
      WHERE sh.user_id = ?
      ORDER BY sh.searched_at DESC
      LIMIT 50
    `,
            [userId]
        );
        return rows;
    },

    delete: async (id, userId) => {
        const [result] = await db.execute(
            "DELETE FROM search_history WHERE id = ? AND user_id = ?",
            [id, userId]
        );
        return result.affectedRows > 0;
    },

    deleteAll: async (userId) => {
        const [result] = await db.execute(
            "DELETE FROM search_history WHERE user_id = ?",
            [userId]
        );
        return result.affectedRows > 0;
    },
};

module.exports = SearchHistoryModel;
