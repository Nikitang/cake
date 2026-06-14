const express = require("express");
const {
  getUserOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
  extendDeliveryDate,
} = require("../controllers/ordersController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/my", verifyToken, getUserOrders);
router.get("/all", verifyToken, checkRole(["manager", "admin"]), getAllOrders);
router.post("/", verifyToken, createOrder);
router.put(
  "/:id/status",
  verifyToken,
  checkRole(["manager", "admin"]),
  updateOrderStatus,
);
router.put(
  "/:id/extend",
  verifyToken,
  checkRole(["manager", "admin"]),
  extendDeliveryDate,
);

module.exports = router;
