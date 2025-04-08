const config = require("../config/auth.config");
const db = require("../models");
const Vehicule = db.vehicule;
const utilisateur = db.utilisateur;
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "doqw2jsg3",
  api_key: "472566731662461",
  api_secret: "nGIW9NMQwDsXwQDI42nQ9aNjekk",
  secure: true,
});
let streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
exports.createVehicule = async (req, res) => {
  try {
    const file = req.file;
    const result = await streamUpload(file);

    const utilisateurFound = await utilisateur.findById(req.body.utilisateurId);
    if (!utilisateurFound)
      return res.status(404).send({ message: "Utilisateur non trouvé" });

    const newVehicule = new Vehicule({
      ...req.body,
      image: result.url,
      utilisateur: req.body.utilisateurId,
    });

    await newVehicule.save();
    res.send({ message: "Véhicule enregistré avec succès!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findVoitureClient = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({
      status: "non valider",
      utilisateur: req.params.utilisateurId,
    });
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.findVoitureValide =  async(req, res) => {
  try {
    const findVoitureValide = await Vehicule.find({ status: "valide", utilisateur: req.params.utilisateurId })
    if (!findVoitureValide){
      return res.status(404).send({message:"il n'y aps de voiture valide"})
    }
    return res.send(findVoitureValide);
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};
exports.findVehiculeReparationPayer = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ status: "valide" })
      .populate("utilisateur")
      .exec();
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findVoitureTerminee = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ status: "terminee" })
      .populate("utilisateur")
      .exec();
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findVoitureBondeSortieValider = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ status: "sortie valider" })
      .populate("utilisateur")
      .exec();
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateStatusVehicule = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params._id);
    
    if (!vehicule) {
      return res.status(404).send({ message: "Véhicule non trouvé" });
    }

    await Vehicule.updateOne(
      { _id: req.params._id },
      { $set: { status: "sortie valider" } }
    );
    
    res.send({ message: "sortie valider" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findVehiculeRecuperer = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({
      status: "sortie valider",
      utilisateur: req.params.utilisateurId
    }).populate("utilisateur");
    
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateStatusVehiculeRecuperer = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params._id);
    
    if (!vehicule) {
      return res.status(404).send({ message: "Véhicule non trouvé" });
    }

    await Vehicule.updateOne(
      { _id: req.params._id },
      { $set: { status: "recuperer" } }
    );
    
    res.send({ message: "recuperer" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findHistoriqueVehicule = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({
      status: "recuperer",
      utilisateur: req.params.utilisateurId
    }).populate("utilisateur");
    
    res.send(vehicules);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.stats = async (req, res) => {
  try {
    const list = await Vehicule.find({
      $or: [{ status: "terminee" }, { status: "recuperer" }],
    });
    
    const data = list.map(car => {
      const timeArr = car.totalTempsReparation?.split(",") || [];
      
      const days = timeArr[0] ? parseInt(timeArr[0].replace("j", "")) : 0;
      const hours = timeArr[1] ? parseInt(timeArr[1].replace("h", "")) : 0;
      const minutes = timeArr[2] ? parseInt(timeArr[2].replace("mn", "")) : 0;
      const seconds = timeArr[3] ? parseInt(timeArr[3].replace("s", "")) : 0;
      
      const totalTime = days * 86400 + hours * 3600 + minutes * 60 + seconds;
      
      return {
        avgTimeInDays: totalTime / 86400,
        avgTimeInHours: totalTime / 3600,
        avgTimeInMinutes: totalTime / 60,
        avgTimeInSeconds: totalTime,
        vehicleName: car.nom
      };
    });
    
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
