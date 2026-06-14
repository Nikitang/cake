const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", verifyToken, checkRole(["admin"]), createProduct);
router.put("/:id", verifyToken, checkRole(["admin"]), updateProduct);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteProduct);

module.exports = router;
