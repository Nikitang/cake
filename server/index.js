const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршруты
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/statistics", require("./routes/statisticsRoutes"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Сервер работает",
    db: "Gerasimenya_demo_2026",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
