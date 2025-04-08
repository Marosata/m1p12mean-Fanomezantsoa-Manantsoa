const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Utilisateur = db.utilisateur;
const Role = db.role;
const config = require("../config/auth.config");

exports.signup = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.mot_de_passe, 10);

    const user = new Utilisateur({
      nom: req.body.nom,
      email: req.body.email,
      mot_de_passe: hashedPassword,
    });

    // Gestion des rôles
    if (req.body.roles) {
      const roles = await Role.find({ nom: { $in: req.body.roles } });
      user.roles = roles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ nom: "client" });
      user.roles = [defaultRole._id];
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: "Utilisateur enregistré avec succès",
      data: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    handleAuthError(res, error);
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await Utilisateur.findOne({ nom: req.body.nom })
      .populate("roles", "nom -_id")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const passwordValid = bcrypt.compareSync(
      req.body.mot_de_passe,
      user.mot_de_passe
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides",
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: "24h",
    });

    const authorities = user.roles.map(
      (role) => `ROLE_${role.nom.toUpperCase()}`
    );

    req.session.token = token;

    res.json({
      success: true,
      data: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        roles: authorities,
        token: token,
      },
    });
  } catch (error) {
    handleAuthError(res, error);
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    res.clearCookie("garage-session");

    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    handleAuthError(res, error);
  }
};

// Gestion centralisée des erreurs d'authentification
function handleAuthError(res, error) {
  console.error("Erreur d'authentification:", error);

  // Gestion des erreurs Mongoose
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Erreur de validation",
      errors: Object.values(error.errors).map((e) => e.message),
    });
  }

  res.status(500).json({
    success: false,
    message: "Erreur serveur lors de l'opération d'authentification",
  });
}
