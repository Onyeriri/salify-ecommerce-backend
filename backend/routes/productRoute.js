const {
  createProduct,
  getProducts,
} = require("../controllers/productController");
const express = require("express");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.get("/", protect, getProducts);

module.exports = router;
