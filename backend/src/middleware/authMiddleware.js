const jwt =require( "jsonwebtoken");
const User =require( "../models/User.js");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // Récupère l'utilisateur sans le mot de passe
            // console.log("Utilisateur authentifié:", req.user); // Ajoutez cette ligne pour voir les données de l'utilisateur
            next(); // Si tout est ok, on passe au middleware suivant
        } catch (error) {
            // console.log("Utilisateur authentifié:", req.user); // Ajoutez cette ligne pour voir les données de l'utilisateur
            res.status(401).json({ message: "Non autorisé" });  // Token invalide ou expiré
        }
    } else {
        // console.log("Utilisateur authentifié:", req.user); // Ajoutez cette ligne pour voir les données de l'utilisateur
        res.status(401).json({ message: "Non autorisé" });  // Pas de token dans l'en-tête
    }
};


const isManager = (req, res, next) => {
    if (req.user && req.user.role === "manager") {
        next();
    } else {
        res.status(403).json({ message: "Accès interdit : seuls les managers peuvent effectuer cette action." });
    }
};

module.exports = { protect, isManager };