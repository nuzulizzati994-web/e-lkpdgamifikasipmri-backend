const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "ratio",
  "root",
  "12345678",
  {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: console.log,
  }
);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Terhubung ke database SQLite di:", dbPath);
  } catch (err) {
    console.error("❌ Gagal konek ke database:", err.message);
  }
})();

module.exports = sequelize;

    