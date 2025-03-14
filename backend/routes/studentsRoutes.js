const express = require("express");
const Student = require("../Models/Students");

const router = express.Router();

// Créer un élève
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

// Récupérer tous les élèves
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Modifier un élève
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(student);
});

// Supprimer un élève
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Élève supprimé" });
});

module.exports = router;
