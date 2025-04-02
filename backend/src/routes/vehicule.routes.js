const controller = require("../controllers/vehicule.controller");
var bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const fileUpload = multer();
const authJwt = require("../middleware/authJwt");
// var upload = multer({ dest: 'images/' });
module.exports = function(app) {
    app.post("/api/vehicule/createVehicule",fileUpload.single('file'),  [authJwt.verifyToken],controller.createVehicule);
    app.get("/api/vehicule/findVoitureClient/:utilisateurId",  [authJwt.verifyToken],controller.findVoitureClient);
    app.get("/api/vehicule/findVoitureValide/:utilisateurId",  [authJwt.verifyToken],controller.findVoitureValide);
    app.get("/api/vehicule/findVehiculeReparationPayer",  [authJwt.verifyToken],controller.findVehiculeReparationPayer);
    app.get("/api/vehicule/findVoitureTerminee",  [authJwt.verifyToken],controller.findVoitureTerminee);
    app.post("/api/vehicule/updateStatusVehicule/:_id",  [authJwt.verifyToken],controller.updateStatusVehicule);
    app.get("/api/vehicule/findVoitureBondeSortieValider", [authJwt.verifyToken],controller.findVoitureBondeSortieValider);
    app.get("/api/vehicule/findVehiculeRecuperer/:utilisateurId", [authJwt.verifyToken],controller.findVehiculeRecuperer);
    app.post("/api/vehicule/updateStatusVehiculeRecuperer/:_id", [authJwt.verifyToken],controller.updateStatusVehiculeRecuperer);
    app.get("/api/vehicule/findHistoriqueVehicule/:utilisateurId", [authJwt.verifyToken],controller.findHistoriqueVehicule);
    app.get('/api/images/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        const imagePath = path.join(__dirname,'..','images', imageName);
        res.sendFile(imagePath);
        console.log(imagePath)
    });
    app.get('/api/vehicule/stats', [authJwt.verifyToken],controller.stats);
}