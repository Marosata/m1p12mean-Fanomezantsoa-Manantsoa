const express = require("express");
const router = express.Router();
const rendezVousController = require("../controllers/rendezVousController");

// Vous pouvez ajouter ici un middleware d’authentification
router.post("/", rendezVousController.createAppointment);
router.get("/", rendezVousController.getAppointments);
router.put("/:id", rendezVousController.updateAppointment);
router.delete("/:id", rendezVousController.deleteAppointment);

module.exports = router;
