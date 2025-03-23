const mongoose = require("mongoose");

const reparationSchema = new mongoose.Schema({
  vehicle: { type: String, required: true },
  pieces: [{ type: String }],
  status: { type: String, enum: ["en attente", "en cours", "complete"], default: "en attente" },
  // Optionnel : lier une réparation à un rendez-vous
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "rendezVous" }
}, { timestamps: true });

module.exports = mongoose.model("Reparation", reparationSchema);
