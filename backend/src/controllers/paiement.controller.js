const config = require("../config/auth.config");
const db = require("../models");
const Paiement = db.paiement;
const Vehicule = db.vehicule;
const path = require("path");
const fs = require("fs");
const finished = require("stream").finished;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config;

exports.validerPaiement = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.body.vehicule);
    if (!vehicule)
      return res.status(404).send({ message: "Véhicule non trouvé" });

    if (vehicule.status === "en attente") {
      return res
        .status(400)
        .send({ message: "Le véhicule est déjà en attente" });
    }

    const newPaiement = new Paiement({ vehicule: vehicule._id });
    await newPaiement.save();

    await Vehicule.updateOne(
      { _id: req.body.vehicule },
      {
        $set: {
          status: "en attente",
          totalPrixReparation: req.body.prix,
        },
      }
    );

    res.send({ message: "Paiement et statut mis à jour avec succès" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findVehiculeEnAttente = async (req, res) => {
  try {
    const paiements = await Paiement.find({ status: "en attente" }).populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "en attente" },
    });

    const paiementsAttente = paiements.filter((p) => p.vehicule !== null);
    res.send(paiementsAttente);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.accepterPaiement = (req, res) => {
  // ty no action ataon'ny responsable financier ivalidena anle paiement ao am pageny
  Vehicule.updateOne(
    { _id: req.body.vehicule },
    { $set: { status: "valide" } },
    (err, vehicule) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!vehicule) {
        return res.status(404).send({ message: "Vehicule not found" });
      }
      return res.send({ message: "Paiement Valider avec succes" });
    }
  );
};
exports.getAllPaiementValider = (req, res) => {
  //par status "en attente"
  Paiement.find({})
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, paiements) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      // Only return the Paiement documents that have a 'valider' status vehicule
      const paiementsValider = paiements.filter(
        (paiement) => paiement.vehicule !== null
      );
      res.send(paiementsValider);
    });
};
