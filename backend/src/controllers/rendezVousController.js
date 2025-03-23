const Appointment = require("../models/rendezVous");

exports.createAppointment = async (req, res) => {
  try {
    // Ici, vous pouvez intégrer une vérification pour empêcher la double réservation
    const findAppointment = new Appointment(req.body);
    await findAppointment.findById(req.Appointment);
    
    const appointment = new Appointment(req.body);
    if(appointment=findAppointment){
      await appointment.save();
      res.status(201).json(appointment);
    }res.json({message:"Erreur"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("client", "name email")
      .populate("mecanicien", "name email");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Rendez-vous supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
