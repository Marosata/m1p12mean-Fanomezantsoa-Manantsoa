const config = require("../config/auth.config");
const db = require("../models");
const TypeReparation = db.typeReparation;
exports.findTypeReparation = async (req, res) => {
  try {
    const types = await TypeReparation.find(); // Plus besoin du callback
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTypeReparation = async (req, res) => {
  try {
    const typeRepare = new TypeReparation(req.body);
    const savedType = await typeRepare.save();
    res.send({ 
      message: "Type de réparation créé avec succès",
      typeReparation: savedType 
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findTypeReparationById = async (req, res) => {
  try {
    const type = await TypeReparation.findById(req.params._id);
    if (!type) return res.status(404).send({ message: "Type non trouvé" });
    res.send(type);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
