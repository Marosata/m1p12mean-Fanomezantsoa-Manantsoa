const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.json({ message: "API Running" }));

// route api
require ('./src/routes/auth.routes');
require ('./src/routes/paiement.routes');
require ('./src/routes/reparation.routes');
require ('./src/routes/role.routes');
require ('./src/routes/typeReparation.routes');
require ('./src/routes/utilisateur.routes');
require ('./src/routes/vehicule.routes');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
