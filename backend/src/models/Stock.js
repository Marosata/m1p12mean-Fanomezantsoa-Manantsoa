const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Stock", stockSchema);
