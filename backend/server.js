const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.json({ message: "API Running" }));

// Importation des routes
const authRoutes = require("./src/routes/authRoute");
const rendezvousRoutes = require("./src/routes/rendezVousRoute");
const reparationRoutes = require("./src/routes/reparationRoute");
const employeRoutes = require("./src/routes/employeRoute");
const paiementRoutes = require("./src/routes/paiementRoute");
const stockRoutes = require("./src/routes/stockRoute");
const userRoute = require("./src/routes/userRoute");

// Utilisation des routes avec préfixe
app.use("/api/auth", authRoutes);
app.use("/api/rendezvous", rendezvousRoutes);
app.use("/api/reparation", reparationRoutes);
app.use("/api/employe", employeRoutes);
app.use("/api/paiement", paiementRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/users",userRoute );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
