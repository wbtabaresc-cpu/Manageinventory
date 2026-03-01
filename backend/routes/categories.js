const express = require("express");
const Category = require("../models/Category");
const auth = require("../middleware/auth");

const router = express.Router();

// Listar todas las categorías disponibles
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error al cargar categorías" });
  }
});

// Crear categoría nueva (limpia espacios en el nombre)
router.post("/", auth, async (req, res) => {
  try {
    let { name, description, status } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ message: "El nombre es obligatorio" });

    name = name.trim();
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "La categoría ya existe" });

    const category = await Category.create({ name, description: description || "", status: status || "ACTIVE" });
    res.status(201).json({ message: "Categoría guardada", category });
  } catch (err) {
    res.status(500).json({ message: "Error al crear categoría" });
  }
});

// Actualizar nombre o descripción de categoría
router.put("/:id", auth, async (req, res) => {
  try {
    let { name, description, status } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description;
    if (status) category.status = status;

    await category.save();
    res.json({ message: "Categoría actualizada", category });
  } catch (err) {
    res.status(500).json({ message: "Error al editar categoría" });
  }
});

// Quitar categoría permanentemente
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No existe la categoría" });
    res.json({ message: "Categoría borrada" });
  } catch (err) {
    res.status(500).json({ message: "Error al borrar categoría" });
  }
});

module.exports = router;