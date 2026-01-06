const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./src/routes");
const sequelize = require("./src/config/db");

dotenv.config();

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "https://nuzulizzati994-web.github.io",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json());
app.use("/api", routes);
app.get("/test", (req, res) => {
  return res.status(200).json({
    message: "success",
  });
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(port, "0.0.0.0", () =>
      console.log(`Server running on port ${port}`)
    );
  })
  .catch(console.error);
