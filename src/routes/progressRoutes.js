const express = require("express")
const router = express.Router()
const ProgressController = require("../controllers/progressController")
const { authMiddleware } = require("../utils/token")

router.post("/save", authMiddleware, ProgressController.save);
router.get("/export", ProgressController.export);

module.exports = router
