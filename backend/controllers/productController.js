const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Prodotti trovati:", products);
    res.json(products);
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error);
    res.status(500).json({ message: "Errore nel recupero dei prodotti" });
  }
};

