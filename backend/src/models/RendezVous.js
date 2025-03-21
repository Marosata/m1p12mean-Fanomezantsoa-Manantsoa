const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mecanicien: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    statut: { type: String, enum: ["en attente", "confirmé", "annulé", "terminé"], default: "en attente" },
}, { timestamps: true });

module.exports = mongoose.model("RendezVous", rendezVousSchema);
