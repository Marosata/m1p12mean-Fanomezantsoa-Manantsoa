const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Identifiants incorrects" });
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res )  => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    res.json({ message: "Déconnexion réussie" });
  }else{
    res.json({message :"Erreur"});
  }
};
