const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID richiesto" });
    }
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero ordini", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, products, total } = req.body;

    const newOrder = new Order({
      userId,
      products,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: "Ordine salvato con successo!", order: newOrder });
  } catch (error) {
    console.error("Errore nel salvataggio dell'ordine:", error);
    res.status(500).json({ message: "Errore nel salvataggio dell'ordine" });
  }
});

module.exports = router;