const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["mecanicien", "manager"], required: true , default : "mecanicien"}
}, { timestamps: true });

module.exports = mongoose.model("Employe", employeSchema);
