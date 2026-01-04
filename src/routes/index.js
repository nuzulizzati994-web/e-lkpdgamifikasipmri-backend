const express = require("express")
const router = express.Router()
const authRoutes = require('./authRoutes')
const progressRoutes = require('./progressRoutes')

router.use('/auth', authRoutes)
router.use('/progress', progressRoutes)

module.exports = router
