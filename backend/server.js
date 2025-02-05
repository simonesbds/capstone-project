const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware per abilitare CORS e analizzare le richieste JSON
app.use(cors());
app.use(express.json());

// Controllo per la presenza della variabile
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not found in .env file!");
  process.exit(1);
}

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connesso"))
.catch((err) => console.error("Errore durante la connessione:", err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Avvio del server sulla porta specifica
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server avviato, porta: ${PORT}`);
});
