const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.JWT_SECRET || "udangkeju"

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch {
    return false
  }
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" })
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch {
    return res.status(403).json({ message: "Token tidak valid" })
  }
}

module.exports = { generateToken, verifyToken, authMiddleware }
