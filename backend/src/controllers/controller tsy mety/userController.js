const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Ajouter un premier manager via le backend
const createFirstManager = async (req, res) => {
  try {
    // Vérifier si l'utilisateur actuel est déjà un admin
    const existingAdmin = await User.findOne({ role: "manager" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Un manager existe déjà." });
    }

    // Créer le premier manager
    const firstManager = new User({
      name: "Admin",
      email: "admin@garage.com",
      password: await bcrypt.hash("Mamanlisany@M2", 10),
      role: "manager",
      isApproved: true,
    });

    await firstManager.save();

    res.status(201).json({
      message: "Le premier manager a été créé avec succès !",
      user: firstManager,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la création du premier manager.",
      });
  }
};

// connection du manager
const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    if (user.role !== "manager") {
      return res
        .status(403)
        .json({ message: "Accès interdit. Vous n'êtes pas un manager." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" } 
    );

    // Retourner le token JWT
    res.status(200).json({
      message: "Connexion réussie",
      token, // Le token est renvoyé pour l'authentification future
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Inscription
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Utilisateur déjà existant" });

    // Vérifier si le rôle est valide
    if (role !== "client" && role !== "mecanicien") {
      return res
        .status(403)
        .json({
          message:
            "Seuls les clients peuvent s'inscrire.",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "client",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    if (user.isApproved) {
      return res.json({
        message: "Mécanicien " + user.name + " Connecté ",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else if (user.role === "client") {
      return res.json({
        message: "Connecté ",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(201).json({ message: "manager" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Profil utilisateur (protégé)
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  }
};

const getAllUser = async (req,res)=>{
    try {
        const users = await User.find();
        // console.log(res)
        res.json(users);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

// Approuver un mécanicien (manager ihany)
const approveMechanic = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (user.role !== "mecanicien") {
      return res
        .status(400)
        .json({ message: "Seuls les mécaniciens peuvent être approuvés." });
    }

    user.isApproved = true;
    await user.save();
    console.log("Utilisateur authentifié:", req.user); // Ajoutez cette ligne pour vérifier les données de l'utilisateur

    res.json({ message: "Le mécanicien a été approuvé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  loginManager,
  createFirstManager,
  registerUser,
  loginUser,
  getUserProfile,
  approveMechanic,
  getAllUser,
};
