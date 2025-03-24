const Employee = require("../models/Employe");
const User = require("../models/User");

exports.createEmployee = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "manager") {
      return res.status(403).json({ message: "Accès interdit, vous devez être un manager." });
    }

    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "L'utilisateur n'est pas inscrit en tant qu'utilisateur." });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Cet employé est déjà enregistré ." });
    }

    const employee = new Employee({
      name: existingUser.name,
      email: existingUser.email,
      role: req.body.role || "mecanicien", 
    });

    await employee.save();
    res.status(201).json({ message: "Employé ajouté avec succès", employee });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employé supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
