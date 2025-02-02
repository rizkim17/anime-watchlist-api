const db = require("../config/database");

const WatchlistModel = {
    create: async (userId, animeId, status = "plan_to_watch") => {
        const [result] = await db.execute(
            "INSERT INTO watchlist (user_id, anime_id, status) VALUES (?, ?, ?)",
            [userId, animeId, status]
        );
        return result.insertId;
    },

    getByUser: async (userId) => {
        const [rows] = await db.execute(
            `
      SELECT w.* 
      FROM watchlist w
      WHERE w.user_id = ?
      ORDER BY w.created_at DESC
    `,
            [userId]
        );
        return rows;
    },

    update: async (id, userId, status) => {
        const [result] = await db.execute(
            "UPDATE watchlist SET status = ? WHERE id = ? AND user_id = ?",
            [status, id, userId]
        );
        return result.affectedRows > 0;
    },

    delete: async (id, userId) => {
        const [result] = await db.execute(
            "DELETE FROM watchlist WHERE id = ? AND user_id = ?",
            [id, userId]
        );
        return result.affectedRows > 0;
    },

    getStats: async (userId) => {
        const [rows] = await db.execute(
            `
      SELECT 
        status,
        COUNT(*) as count
      FROM watchlist
      WHERE user_id = ?
      GROUP BY status
    `,
            [userId]
        );
        return rows;
    },
};

module.exports = WatchlistModel;
