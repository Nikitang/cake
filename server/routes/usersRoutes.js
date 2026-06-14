const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controllers/usersController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/", verifyToken, checkRole(["admin"]), getAllUsers);
router.post("/", verifyToken, checkRole(["admin"]), createUser);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteUser);

module.exports = router;
