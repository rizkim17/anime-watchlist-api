const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
    registerValidation,
    loginValidation,
    validate,
} = require("../middlewares/validator.middleware");

router.post("/register", registerValidation, validate, AuthController.register);
router.post("/login", loginValidation, validate, AuthController.login);
router.get("/profile", verifyToken, AuthController.getProfile);
router.put("/profile", verifyToken, AuthController.updateProfile);

module.exports = router;
