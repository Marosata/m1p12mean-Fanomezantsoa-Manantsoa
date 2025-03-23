const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");
const { protect,isManager } = require("../middleware/authMiddleware"); 

router.post("/", protect, isManager ,employeController.createEmployee);
router.get("/", protect,isManager,employeController.getEmployees);
router.put("/:id",protect, isManager ,employeController.updateEmployee);
router.delete("/:id",protect, isManager ,employeController.deleteEmployee);

module.exports = router;
