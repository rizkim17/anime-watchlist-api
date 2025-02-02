const db = require("../config/database");
const bcrypt = require("bcryptjs");

const UserModel = {
    findByEmail: async (email) => {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        return rows[0];
    },

    create: async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const [result] = await db.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [userData.username, userData.email, hashedPassword]
        );
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.execute(
            "SELECT id, username, email, profile_picture, created_at FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    updateProfile: async (id, data) => {
        const [result] = await db.execute(
            "UPDATE users SET username = ? WHERE id = ?",
            [data.username, id]
        );
        return result.affectedRows > 0;
    },
};

module.exports = UserModel;
