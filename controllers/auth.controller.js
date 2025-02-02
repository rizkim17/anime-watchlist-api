const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const response = require("../utils/response.util");

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if email already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return response.error(res, "Email already registered", 400);
            }

            // Create new user
            const userId = await UserModel.create({
                username,
                email,
                password,
            });

            // Generate token
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            response.success(res, { token }, "Registration successful", 201);
        } catch (err) {
            console.error(err);
            response.error(res, "Registration failed");
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return response.error(res, "Invalid credentials", 401);
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isValidPassword) {
                return response.error(res, "Invalid credentials", 401);
            }

            // Generate token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            response.success(res, { token }, "Login successful");
        } catch (err) {
            console.error(err);
            response.error(res, "Login failed");
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return response.error(res, "User not found", 404);
            }
            response.success(res, user);
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to get profile");
        }
    },

    updateProfile: async (req, res) => {
        try {
            const username = req.body;
            const success = await UserModel.updateProfile(req.userId, username);

            if (!success) {
                return response.error(res, "Failed to update profile", 400);
            }

            response.success(res, null, "Profile updated successfully");
        } catch (err) {
            console.error(err);
            response.error(res, "Failed to update profile");
        }
    },
};

module.exports = AuthController;
