const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ ambil token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Token tidak ditemukan"
      });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ cari user di database
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User tidak valid"
      });
    }

    // 4️⃣ simpan user ke request
    req.user = user;

    // 5️⃣ lanjut
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Token tidak valid",
      error: error.message
    });
  }
};

module.exports = authMiddleware;
