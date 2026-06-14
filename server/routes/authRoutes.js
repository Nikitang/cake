const express = require("express");
const { login, getProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
