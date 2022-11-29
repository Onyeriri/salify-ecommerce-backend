const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/get-user", protect, getUser);
router.get("/logged-in", loginStatus);

module.exports = router;
