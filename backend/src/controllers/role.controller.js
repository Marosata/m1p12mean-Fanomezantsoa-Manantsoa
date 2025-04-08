const config = require("../config/auth.config");
const db = require("../models");
const Role = db.role;
exports.findRole = async (req, res) => {
  try{
    console.log(req.body);
    Role.find();
  }catch(error){
    console.error(error)
    res.status(500).json({message: error.message});
  }
};
