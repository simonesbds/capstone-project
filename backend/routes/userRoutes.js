const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("API richiesta per userId:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID richiesto" });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.json(user);
  } catch (error) {
    console.error("Errore nel backend:", error);
    res.status(500).json({ message: "Errore nel recupero del profilo", error });
  }
});

module.exports = router;