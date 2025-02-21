const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Richiesta ricevuta");
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID richiesto." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: { userId },
    });

    console.log("Sessione di pagamento creata:", session.id);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Errore con Stripe:", error);
    res.status(500).json({ message: "Errore nel pagamento" });
  }
});

module.exports = router;