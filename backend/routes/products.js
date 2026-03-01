const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

// Traer todos los productos ordenados por los más nuevos
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al cargar la lista de productos" });
  }
});

// Buscar un producto específico por su ID
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar el producto" });
  }
});

// Guardar un producto nuevo (valida que el código sea único)
router.post("/", auth, async (req, res) => {
  try {
    const { code, name, category, subcategory, quantity, unit, location, supplier, description } = req.body;

    if (quantity !== undefined && quantity < 0) {
       return res.status(400).json({ message: "La cantidad no puede ser negativa" });
    }

    const existing = await Product.findOne({ code });
    if (existing) return res.status(400).json({ message: "Ya existe un producto con este código" });

    const product = await Product.create({
      code, name, category, subcategory, quantity, unit, location, supplier, description,
      stock: quantity || 0,
    });

    res.status(201).json({ message: "Producto creado", product });
  } catch (err) {
    res.status(500).json({ message: "Error al guardar el producto" });
  }
});

// Editar datos de un producto
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

// Borrar producto de la base de datos
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al borrar producto" });
  }
});

module.exports = router;