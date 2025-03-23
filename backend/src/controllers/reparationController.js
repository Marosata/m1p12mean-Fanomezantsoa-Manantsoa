const Repair = require("../models/Reparation");

exports.createRepair = async (req, res) => {
  try {
    const repair = new Repair(req.body);
    await repair.save();
    res.status(201).json(repair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find().populate("appointment");
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRepairStatus = async (req, res) => {
  try {
    const repair = await Repair.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(repair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
