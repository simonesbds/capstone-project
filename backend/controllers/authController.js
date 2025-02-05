const User = require('../models/User');

// Funzione per sincronizzare l'utente con Clerk nel database
const syncUser = async (req, res) => {
  try {
    console.log("Dati ricevuti per sync:", req.body);

    const { clerkId, email, name, avatar } = req.body;

    // Verifica la presenza dei campi richiesti
    if (!clerkId || !email || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Cerca l'utente nel database
    let user = await User.findOne({ $or: [{ clerkId }, { email }] });

    // Crea l'utente se non esiste
    if (!user) {
      user = new User({ clerkId, email, name, avatar });
      await user.save();
      console.log("Nuovo utente creato:", user);
    } else {
      console.log("Utente trovato:", user);
    }

    res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    console.error("Errore durante il sync user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { syncUser };
