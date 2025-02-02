const db = require("../config/database");

const ReviewModel = {
    create: async (userId, animeId, rating, content) => {
        const [result] = await db.execute(
            "INSERT INTO reviews (user_id, anime_id, rating, content) VALUES (?, ?, ?, ?)",
            [userId, animeId, rating, content]
        );
        return result.insertId;
    },

    getByAnime: async (animeId) => {
        const [rows] = await db.execute(
            `
      SELECT r.*, u.username
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.anime_id = ?
      ORDER BY r.created_at DESC
    `,
            [animeId]
        );
        return rows;
    },

    update: async (id, userId, rating, content) => {
        const [result] = await db.execute(
            "UPDATE reviews SET rating = ?, content = ? WHERE id = ? AND user_id = ?",
            [rating, content, id, userId]
        );
        return result.affectedRows > 0;
    },

    delete: async (id, userId) => {
        const [result] = await db.execute(
            "DELETE FROM reviews WHERE id = ? AND user_id = ?",
            [id, userId]
        );
        return result.affectedRows > 0;
    },
};

module.exports = ReviewModel;
