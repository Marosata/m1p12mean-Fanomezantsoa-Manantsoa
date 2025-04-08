const config = require("../config/auth.config");
const db = require("../models");
const Reparation = db.reparation;
const vehicule = db.vehicule;
const typeReparation = db.typeReparation;
const moment = require("moment-timezone");
exports.createReparation = async (req, res) => {
  try {
    const vehiculeFound = await Vehicule.findById(req.body.vehicule);
    if (!vehiculeFound) return res.status(404).send({ message: "Véhicule non trouvé" });

    const typeReparationFound = await TypeReparation.findById(req.body.typeReparation);
    if (!typeReparationFound) return res.status(404).send({ message: "Type de réparation non trouvé" });

    const newReparation = new Reparation({
      ...req.body,
      vehicule: vehiculeFound._id,
      typeReparation: typeReparationFound._id
    });

    await newReparation.save();
    res.send({ message: "Réparation créée avec succès" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateOneReparationTerminee = async (req, res) => {
  try {
    const reparation = await Reparation.findById(req.params._id);
    if (!reparation) return res.status(404).send({ message: "Réparation non trouvée" });

    const dateHeureFin = new Date().toLocaleString("fr-FR", { timeZone: "Indian/Antananarivo" });
    
    // Calcul de la durée
    const start = moment(reparation.dateHeureDebut, "DD/MM/YYYY HH:mm:ss");
    const end = moment(dateHeureFin, "DD/MM/YYYY HH:mm:ss");
    const duration = moment.duration(end.diff(start));

    const tempsReparation = 
      `${duration.days()}j,${duration.hours()}h,${duration.minutes()}mn,${duration.seconds()}s`;

    await Reparation.updateOne(
      { _id: req.params._id },
      { 
        $set: { 
          dateHeureFin,
          tempsReparation,
          statusUneReparation: "terminee" 
        }
      }
    );

    res.send({ message: "Statut terminé mis à jour" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findDepotReparationParVoiture = async (req, res) => {
  try {
    const findReparationParVoiture = await Reparation.find(
      {vehicule: req.params.vehicule}
    ).populate(
      [
        "typeReparation" ,
        "vehicule"
    ]);
    return findReparationParVoiture;
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

exports.findReparationById = async(req, res) => {
  try {
    const reparation = await Reparation.findOne(
      {_id: req.params._id})
      .populate([
          "typeReparation" ,
          "vehicule"
        ]);
        return reparation;
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteReparation = (req, res) => {
  try {
    Reparation.deleteOne({ _id: req.params._id })
      .then(() => {
        res.send({ message: "Reparation deleted successfully" });
      })
  } catch (error) {
      return res.status(500).send({ message: "Error deleting reparation" });
  }
    
};

exports.listeVehiculeDepot = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      utilisateur: req.params.utilisateurId,
    }).populate({
      path: "vehicule",
      match: { utilisateur: req.params.utilisateurId, status: "non valider" },
      select: "nom type image immatriculation",
    });

    const distinctVehicles = [];
    const seenIds = new Set();

    reparations.forEach((r) => {
      if (r.vehicule && !seenIds.has(r.vehicule._id.toString())) {
        seenIds.add(r.vehicule._id.toString());
        distinctVehicles.push(r.vehicule);
      }
    });

    res.json(distinctVehicles);
  } catch (error) {
    console.error("Erreur dans listeVehiculeDepot:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.listeDepotVoitureParVoiture = async(req, res) => {
  try {
    const depotVoitureParVoiture = await Reparation.find({
      utilisateur: req.params.utilisateurId,
      vehicule: req.params.vehicule,
    }).populate(["typeReparation", "vehicule"])
    if (!depotVoitureParVoiture) {
      return res.status(404).send({ message: "il n'y pas encore de depot de voiture" });
    }
    return depotVoitureParVoiture;
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getReparationParVehicule = async  (req, res) => {
  try {
    const getRepParrVehicule = await Reparation.find({ vehicule: req.params.vehicule })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    if(!getRepParVehicule){
      return res.status(404).send({ message: "il n'y pas encore de réparation de voiture" });
    }
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

exports.updateOneReparationEncours = async (req, res) => {
  try {
    const reparationId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(reparationId)) {
      return res.status(400).json({
        success: false,
        message: "Réparation invalide"
      });
    }

    const existingReparation = await Reparation.findById(reparationId);

    if (!existingReparation) {
      return res.status(404).json({
        success: false,
        message: "Réparation non trouvée"
      });
    }

    if (existingReparation.statusUneReparation === "en cours") {
      return res.status(400).json({
        success: false,
        message: "La réparation est déjà en cours"
      });
    }

    const updatedReparation = await Reparation.findByIdAndUpdate(
      reparationId,
      {
        $set: {
          statusUneReparation: "en cours",
          dateHeureDebut: moment()
            .tz("Indian/Antananarivo")
            .format("DD/MM/YYYY HH:mm:ss")
        }
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Cette réparation est en cours maintenant ",
      data: {
        id: updatedReparation._id,
        status: updatedReparation.statusUneReparation,
        dateHeureDebut: updatedReparation.dateHeureDebut
      }
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);

    // Gestion des erreurs de validation Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Erreur de validation",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour"
    });
  }
};

exports.updateVehiculeTerminee = (req, res) => {
  try {
    Reparation.find({ vehicule: req.params.vehicule }, (err, repairList) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log(req.params);
      let totalRepairTime = "0j,0h,0mn,0s";
      repairList.forEach((repair) => {
        totalRepairTime = addRepairTime(
          totalRepairTime,
          repair.tempsReparation
        );
      });
      const dateHeureFin = new Date().toLocaleString("fr-FR", {
        timeZone: "Indian/Antananarivo",
      });
      vehicule.updateOne(
        { _id: req.params.vehicule },
        { $set: { DateHeureFin: dateHeureFin } },
        function (err) {
          if (err) {
            return res.status(500).send({ message: err });
          }
        }
      );
      const Status = "terminee";
      vehicule.updateOne(
        { _id: req.params.vehicule },
        { $set: { status: Status } },
        function (err) {
          if (err) {
            return res.status(500).send({ message: err });
          }
        }
      );
      console.log("totalTempsReparation:" + totalRepairTime);
      vehicule.updateOne(
        { _id: req.params.vehicule },
        { $set: { totalTempsReparation: totalRepairTime } },
        (err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
          res.send({ message: "Vehicule updated successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getReparationAFaire = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      vehicule: req.params.vehicule,
      statusUneReparation: "à faire",
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getReparationEnCours = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      vehicule: req.params.vehicule,
      statusUneReparation: "en cours",
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getReparationTerminee = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      vehicule: req.params.vehicule,
      statusUneReparation: "terminee",
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getReparationavancement = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      utilisateur: req.params.utilisateurId,
      vehicule: req.params.vehicule,
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addRepairTime = (time1, time2) => {
  // La fonction reste identique
  const time1Arr = time1.split(",");
  const time2Arr = time2.split(",");
  let days =
    parseInt(time1Arr[0].slice(0, -1)) + parseInt(time2Arr[0].slice(0, -1));
  let hours =
    parseInt(time1Arr[1].slice(0, -1)) + parseInt(time2Arr[1].slice(0, -1));
  let minutes =
    parseInt(time1Arr[2].slice(0, -2)) + parseInt(time2Arr[2].slice(0, -2));
  let seconds = parseInt(time1Arr[3]) + parseInt(time2Arr[3]);
  
  // Le reste du calcul reste identique
  return `${days}j,${hours}h,${minutes}mn,${seconds}s`;
};

exports.getFactureReparationParVoiture = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      utilisateur: req.params.utilisateurId,
      vehicule: req.params.vehicule,
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getBondeSortieParVoiture = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      utilisateur: req.params.utilisateurId,
      vehicule: req.params.vehicule,
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "terminee" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getHistoriqueReparation = async (req, res) => {
  try {
    const reparations = await Reparation.find({
      utilisateur: req.params.utilisateurId,
      vehicule: req.params.vehicule,
      statusUneReparation: "terminee",
    })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "recuperer" },
    })
    .exec();

    res.send(reparations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};