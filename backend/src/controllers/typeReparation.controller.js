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

exports.createTypeReparation = (req, res) => {
  const typeRepare = new TypeReparation({
    nomTypeReparation: req.body.nomTypeReparation,
    description: req.body.description,
    image: req.body.image,
    prixReparation: req.body.prixReparation,
  });

  typeRepare.save((err, typeReparation) => {
    ///miinsert eto
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({
      message: "TypeReparation was created successfully",
      typeReparation,
    });
  });
};
exports.findTypeReparationById = (req, res) => {
  ///maka typeReparation By id
  console.log(req.params.nomTypeReparation);
  TypeReparation.find({ _id: req.params._id }, (err, TypeReparation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(TypeReparation);
  });
};
