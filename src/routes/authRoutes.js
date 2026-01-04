const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/authController")
const { authMiddleware } = require("../utils/token")

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/logout", authMiddleware, AuthController.logout)
router.post("/check", AuthController.check)

module.exports = router
