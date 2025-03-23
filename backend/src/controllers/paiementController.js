const Payment = require("../models/Paiement");

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("client", "name email");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
