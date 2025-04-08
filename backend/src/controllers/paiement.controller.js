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

exports.accepterPaiement= async (req,res)=>{
  try {
    const vehiculeUpdate = await Vehicule.updateOne(
      {_id : req.body.vehicule},
      {$set:{status: "valide"}},
    );
    if (!vehiculeUpdate)
      return res.status(404).send({ message: "Véhicule non trouvé" });

    if (vehicule.status === "valide") {
      return res
        .status(400)
        .send({ message: "Le véhicule est déjà validé" });
    }
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
}

exports.getAllPaiementValider= async (req,res)=>{
  try {
    const paiementsValider = await Paiement.find()
    if(!paiementsValider){
      return res.status(404).send({ message: "Il n'y a pas encore de paiement Validé. " });
    }
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
}
