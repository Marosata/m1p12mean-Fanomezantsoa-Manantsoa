const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mecanicien: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("rendezVous", rendezVousSchema);