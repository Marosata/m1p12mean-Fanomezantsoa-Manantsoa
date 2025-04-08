const config = require("../config/auth.config");
const db = require("../models");
const Utilisateur = db.utilisateur;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = new Utilisateur({
      nom: req.body.nom,
      email: req.body.email,
      mot_de_passe: bcrypt.hashSync(req.body.mot_de_passe, 8),
    });

    const savedUser = await user.save();

    if (req.body.roles) {
      const roles = await Role.find({ nom: { $in: req.body.roles } });
      savedUser.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ nom: "client" });
      savedUser.roles = [role._id];
    }

    await savedUser.save();
    res.send({ message: "Utilisateur enregistré avec succès!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await Utilisateur.findOne({ nom: req.body.nom }).populate(
      "roles",
      "-__v"
    );

    if (!user)
      return res.status(404).send({ message: "Utilisateur non trouvé" });

    const passwordIsValid = bcrypt.compareSync(
      req.body.mot_de_passe,
      user.mot_de_passe
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Mot de passe invalide!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    const authorities = user.roles.map(
      (role) => "ROLE_" + role.nom.toUpperCase()
    );

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      nom: user.nom,
      email: user.email,
      roles: authorities,
      token: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Vous vous êtes déconnecter!" });
  } catch (err) {
    this.next(err);
  }
};
