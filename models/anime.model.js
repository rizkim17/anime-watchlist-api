const db = require("../config/database");

const AnimeModel = {
    create: async (animeData) => {
        const [result] = await db.execute(
            "INSERT INTO animes (title, synopsis, year, genre, status, episodes, rating, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                animeData.title,
                animeData.synopsis,
                animeData.year,
                animeData.genre,
                animeData.status,
                animeData.episodes,
                animeData.rating,
                animeData.image_url,
            ]
        );
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.execute("SELECT * FROM animes WHERE id = ?", [
            id,
        ]);
        return rows[0];
    },

    findByMalId: async (malId) => {
        const [rows] = await db.execute(
            "SELECT * FROM animes WHERE mal_id = ?",
            [malId]
        );
        return rows[0];
    },

    search: async (query, limit = 10, offset = 0) => {
        const [rows] = await db.execute(
            "SELECT * FROM animes WHERE title LIKE ? LIMIT ? OFFSET ?",
            [`%${query}%`, limit, offset]
        );
        return rows;
    },
};

module.exports = AnimeModel;
