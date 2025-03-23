const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  invoiceDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Paiement", paiementSchema);
