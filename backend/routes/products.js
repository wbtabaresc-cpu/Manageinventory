const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth"); // <--- INTEGRACIÓN: Importamos el módulo de seguridad

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Obtener todos los productos (Protegido)
 */
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Obtener un producto por ID (Protegido)
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (err) {
    console.error("Get product by id error:", err);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto (Protegido)
 */
router.post("/", auth, async (req, res) => {
  try {
    const {
      code,
      name,
      category,
      subcategory,
      quantity,
      unit,
      location,
      supplier,
      description,
    } = req.body;

    // Validación de negocio (Buena práctica)
    if (quantity !== undefined && quantity < 0) {
       return res.status(400).json({ message: "La cantidad no puede ser negativa" });
    }

    const existing = await Product.findOne({ code });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Ya existe un producto con este código" });
    }

    const product = await Product.create({
      code,
      name,
      category,
      subcategory,
      quantity,
      unit,
      location,
      supplier,
      description,
      stock: quantity || 0,
    });

    res.status(201).json({
      message: "Producto creado exitosamente",
      product,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Error al crear el producto" });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar un producto (Protegido)
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado", product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar un producto (Protegido)
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

module.exports = router;