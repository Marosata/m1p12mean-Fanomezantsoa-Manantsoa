const jwt =require( "jsonwebtoken");
const User =require( "../models/User.js");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            // console.log("Utilisateur authentifié:", req.user); 
            next();
        } catch (error) {
            res.status(401).json({ message: "Non autorisé" });  // Token invalide ou expiré
        }
    } else {
        res.status(401).json({ message: "Non autorisé" });
    }
};


const isManager = (req, res, next) => {
    if (req.user && req.user.role === "manager") {
        next();
    } else {
        res.status(403).json({ message: "Accès interdit , vous devez être un administrateur." });
    }
};

module.exports = { protect, isManager };