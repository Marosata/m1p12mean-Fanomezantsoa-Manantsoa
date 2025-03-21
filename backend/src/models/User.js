const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "mecanicien", "manager"], default: "client" },
    isApproved: { type: Boolean, default: function () { return this.role === "client"; } } // Clients approuvés par défaut, mécanos & managers non
}, { timestamps: true });


// export default mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);