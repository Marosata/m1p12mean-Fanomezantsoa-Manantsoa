const express = require("express");
const router = express.Router();
const employeController = require("../../controllers/controller tsy mety/employeController");
const { protect,isManager } = require("../../middleware/middlewares tsy mety/authMiddleware"); 

router.post("/", protect, isManager ,employeController.createEmployee);
router.get("/", protect,isManager,employeController.getEmployees);
router.put("/:id",protect, isManager ,employeController.updateEmployee);
router.delete("/:id",protect, isManager ,employeController.deleteEmployee);

module.exports = router;
