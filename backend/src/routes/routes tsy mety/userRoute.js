const express = require("express");
const {
  loginManager,
  registerUser,
  loginUser,
  getUserProfile,
  createFirstManager,
  approveMechanic,
  getAllUser,
} = require("../../controllers/controller tsy mety/userController.js");
const { isManager, protect } = require("../../middleware/middlewares tsy mety/authMiddleware.js");

const router = express.Router();

router.post("/create-first-manager", createFirstManager);
router.put("/approve/:id", protect, isManager, approveMechanic);
router.post("/loginmanager", loginManager);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/all",getAllUser);

module.exports = router;