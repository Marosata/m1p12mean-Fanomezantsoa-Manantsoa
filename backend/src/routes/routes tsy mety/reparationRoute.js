const express = require("express");
const router = express.Router();
const reparationController = require("../../controllers/controller tsy mety/reparationController");

router.post("/", reparationController.createRepair);
router.get("/", reparationController.getRepairs);
router.put("/:id", reparationController.updateRepairStatus);

module.exports = router;
