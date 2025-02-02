const router = require("express").Router();
const SearchHistoryController = require("../controllers/search.history.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, SearchHistoryController.getHistory);
router.delete("/:id", verifyToken, SearchHistoryController.deleteHistory);

module.exports = router;
