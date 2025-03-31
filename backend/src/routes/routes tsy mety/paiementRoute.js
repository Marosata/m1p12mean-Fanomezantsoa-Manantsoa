const express = require("express");
const router = express.Router();
const paiementController = require("../../controllers/controller tsy mety/paiementController");

router.post("/", paiementController.createPayment);
router.get("/", paiementController.getPayments);
router.put("/:id", paiementController.updatePaymentStatus);

module.exports = router;
