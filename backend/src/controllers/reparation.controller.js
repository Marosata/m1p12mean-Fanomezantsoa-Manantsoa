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
exports.findDepotReparationParVoiture = (req, res) => {
  console.log(req.params);
  Reparation.find({ vehicule: req.params.vehicule })
    .populate(["typeReparation", "vehicule"])
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.findReparationById = (req, res) => {
  console.log(req.params);
  Reparation.find({ _id: req.params._id })
    .populate(["typeReparation", "vehicule"])
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.deleteReparation = (req, res) => {
  Reparation.deleteOne({ _id: req.params._id })
    .then(() => {
      res.send({ message: "Reparation deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting reparation" });
    });
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

exports.listeDepotVoitureParVoiture = (req, res) => {
  Reparation.find({
    utilisateur: req.params.utilisateurId,
    vehicule: req.params.vehicule,
  })
    .populate(["typeReparation", "vehicule"])
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getReparationParVehicule = (req, res) => {
  Reparation.find({ vehicule: req.params.vehicule })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.updateOneReparationEncours = (req, res) => {
  Reparation.find({ _id: req.params._id }, (err, reparation) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    console.log(req.params._id);
    if (!reparation) {
      return res.status(404).send({ message: "reparation not found" });
    }
    if (reparation.statusUneReparation === "en cours") {
      return res
        .status(400)
        .send({ message: "reparation is already'en cours'" });
    }
    Reparation.updateOne(
      { _id: req.params._id },
      {
        $set: {
          dateHeureDebut: new Date().toLocaleString("fr-FR", {
            timeZone: "Indian/Antananarivo",
          }),
        },
      },
      function (err, reparation) {
        if (err) {
          return res.status(500).send({ message: err });
        }
        Reparation.updateOne(
          { _id: req.params._id },
          { $set: { statusUneReparation: "en cours" } },
          (err, reparation) => {
            if (err) {
              return res.status(500).send({ message: err });
            }
            return res.send({ message: "status en cours" });
          }
        );
      }
    );
  });
};
exports.getReparationAFaire = (req, res) => {
  //les reparations par vehicule
  Reparation.find({
    vehicule: req.params.vehicule,
    statusUneReparation: "à faire",
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getReparationEnCours = (req, res) => {
  //les reparations par vehicule
  Reparation.find({
    vehicule: req.params.vehicule,
    statusUneReparation: "en cours",
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getReparationTerminee = (req, res) => {
  //les reparations par vehicule
  Reparation.find({
    vehicule: req.params.vehicule,
    statusUneReparation: "terminee",
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getReparationavancement = (req, res) => {
  //les reparations avec les avancements
  Reparation.find({
    utilisateur: req.params.utilisateurId,
    vehicule: req.params.vehicule,
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
const addRepairTime = (time1, time2) => {
  const time1Arr = time1.split(",");
  const time2Arr = time2.split(",");
  let days =
    parseInt(time1Arr[0].slice(0, -1)) + parseInt(time2Arr[0].slice(0, -1));
  let hours =
    parseInt(time1Arr[1].slice(0, -1)) + parseInt(time2Arr[1].slice(0, -1));
  let minutes =
    parseInt(time1Arr[2].slice(0, -2)) + parseInt(time2Arr[2].slice(0, -2));
  let seconds = parseInt(time1Arr[3]) + parseInt(time2Arr[3]);
  while (seconds >= 60) {
    seconds -= 60;
    minutes++;
  }
  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }
  while (hours >= 24) {
    hours -= 24;
    days++;
  }
  console.log(`${days}j,${hours}h,${minutes}mn,${seconds}s`);
  return `${days}j,${hours}h,${minutes}mn,${seconds}s`;
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
exports.getFactureReparationParVoiture = (req, res) => {
  //mamoaka facture an ilay reparation client iray par voiture
  Reparation.find({
    utilisateur: req.params.utilisateurId,
    vehicule: req.params.vehicule,
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "valide" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getBondeSortieParVoiture = (req, res) => {
  Reparation.find({
    utilisateur: req.params.utilisateurId,
    vehicule: req.params.vehicule,
  })
    .populate("typeReparation")
    .populate({
      path: "vehicule",
      populate: { path: "utilisateur" },
      match: { status: "terminee" },
    })
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
exports.getHistoriqueReparation = (req, res) => {
  //les reparations par vehicule historiques
  Reparation.find({
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
    .exec((err, Reparation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(req.params);
      res.send(Reparation);
    });
};
