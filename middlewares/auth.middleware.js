const jwt = require("jsonwebtoken");
const response = require("../utils/response.util");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.error(res, "No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return response.error(res, "Invalid token", 403);
    }
};

module.exports = { verifyToken };
