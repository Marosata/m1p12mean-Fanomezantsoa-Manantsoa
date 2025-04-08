const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const fileUpload = require("express-fileupload");
const db = require("./src/models");
const dbConfig = require("./src/config/db.config");
const Role = db.role;

const app = express();

// Configuration CORS améliorée
const corsOptions = {
  origin: [
    "https://m1p12mean-fanomezantsoa-manantsoa.vercel.app",
    "http://localhost:4200", // Pour le développement local
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Configuration sécurisée des cookies
app.use(
  cookieSession({
    name: "garage-session",
    secret:
      process.env.SESSION_SECRET ||
      "$2y$10$tKovGS01FuBG7g./52jWwudJz/Guj5TCuu7BkD1Mgvh6QUJt/Uf86",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
  })
);

// Connexion MongoDB avec gestion d'erreur améliorée
const connectDB = async () => {
  try {
    await db.mongoose.connect(dbConfig.MongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecté à MongoDB avec succès");
    await initial();
  } catch (err) {
    console.error("Erreur de connexion MongoDB:", err.message);
    process.exit(1);
  }
};

// Initialisation des rôles
async function initial() {
  try {
    const roles = ["client", "responsable_atelier", "responsable_financier"];

    await Promise.all(
      roles.map(async (roleName) => {
        const exists = await Role.findOne({ nom: roleName });
        if (!exists) {
          await new Role({ nom: roleName }).save();
          console.log(`Rôle ${roleName} créé`);
        }
      })
    );
  } catch (err) {
    console.error("Erreur d'initialisation:", err.message);
  }
}

// Routes
const authRoutes = require("./src/routes/auth.routes");
const paiementRoutes = require("./src/routes/paiement.routes");
const reparationRoutes = require("./src/routes/reparation.routes");
const roleRoutes = require("./src/routes/role.routes");
const typeReparationRoutes = require("./src/routes/typeReparation.routes");
const vehiculeRoutes = require("./src/routes/vehicule.routes");

app.use("/api/auth", authRoutes);
app.use("/api/paiements", paiementRoutes);
app.use("/api/reparations", reparationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/type-reparations", typeReparationRoutes);
app.use("/api/vehicules", vehiculeRoutes);

// Middleware de gestion d'erreur centralisé
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
    console.log(`Environnement: ${process.env.NODE_ENV || "development"}`);
  });
});
