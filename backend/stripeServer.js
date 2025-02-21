const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Richiesta ricevuta per il checkout.");
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Dati mancanti per il checkout." });
    }

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: {
        userId: userId,
      },
    });

    console.log("Sessione di pagamento creata:", session.id);
    res.json({ sessionUrl: session.url, sessionId: session.id }); 
  } catch (error) {
    console.error("Errore con Stripe:", error);
    res.status(500).json({ message: "Errore nel pagamento" });
  }
});

app.listen(4242, () => console.log("Stripe in esecuzione sulla porta 4242"));

module.exports = app;