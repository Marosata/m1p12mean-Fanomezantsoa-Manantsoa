const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const fileUpload = require('express-fileupload');
const app = express();
app.use(cors());
var corsOptions = {
  origin: "https://m1p12mean-fanomezantsoa-manantsoa-7gdklhd3o-marosatas-projects.vercel.app/Garage" // Cors ho an'ny côté front
};
 
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "garage-session",
    secret: "$2y$10$tKovGS01FuBG7g./52jWwudJz/Guj5TCuu7BkD1Mgvh6QUJt/Uf86", // bcrypt ngenereko (Raha vakiana dia garage)
    httpOnly: true
  })
);

const db = require("./src/models");
const dbConfig = require("./src/config/db.config");
const Role = db.role;


// Ao am db.config.js no manova anle url de connexion
db.mongoose
  .connect(dbConfig.MongooseURI) // Plus de deuxième paramètre
  .then(() => {
    console.log("Connecté avec succès");
    initial();
  })
  .then(() => {
    console.log("Connecter avec succès");
    initial();
  })
  .catch(err => {
    console.error("Erreur de connexion", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    
    if (count === 0) {
      await Promise.all([
        new Role({ nom: "client" }).save(),
        new Role({ nom: "responsable_atelier" }).save(),
        new Role({ nom: "responsable_financier" }).save()
      ]);

      console.log("Rôles initiaux ajoutés avec succès");
    }
  } catch (err) {
    console.error("Erreur lors de l'initialisation", err);
  }
}
  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.disable('etag');
//route de base
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// route api
require ('./src/routes/auth.routes')(app);
require ('./src/routes/paiement.routes')(app);
require ('./src/routes/reparation.routes')(app);
require ('./src/routes/role.routes')(app);
require ('./src/routes/typeReparation.routes')(app);
require ('./src/routes/utilisateur.routes')(app);
require ('./src/routes/vehicule.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
