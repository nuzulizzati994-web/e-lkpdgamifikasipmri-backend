const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "ratio",
  "admin-k2ms",
  "k2msdensoindonesia",
  {
    host: "31.97.107.156",
    dialect: "mysql",
    logging: console.log,
  }
);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Terhubung ke database Mysql");
  } catch (err) {
    console.error("❌ Gagal konek ke database:", err.message);
  }
})();

module.exports = sequelize;