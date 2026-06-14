const express = require("express");
const { getStatistics } = require("../controllers/statisticsController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/", verifyToken, checkRole(["admin", "manager"]), getStatistics);

module.exports = router;
