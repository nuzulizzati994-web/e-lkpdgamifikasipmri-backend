const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./src/routes");
const sequelize = require("./src/config/db");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ✅ Izinkan akses dari semua origin (bisa disesuaikan)
app.use(
  cors({
    origin: "*", // ganti "*" dengan alamat IP tertentu kalau mau lebih aman, misal: "http://192.168.1.5:8080"
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", routes);

sequelize
  .sync({ alter: true, logging: console.log })
  // .sync({ force: true })
  .then(async () => {
    console.log("🧩 Database siap disinkronkan!");

    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Server berjalan di jaringan pada port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal sinkronisasi database:", err.message);
  });
