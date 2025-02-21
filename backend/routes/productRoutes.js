const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { getAllProducts } = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Prodotto non trovato" });
      }
      res.json(product);
    } catch (error) {
      console.error("Errore nel recupero del prodotto:", error);
      res.status(500).json({ message: "Errore nel recupero del prodotto" });
    }
  });
  

module.exports = router;
