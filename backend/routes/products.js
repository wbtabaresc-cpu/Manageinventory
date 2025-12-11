const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products - list all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// POST /api/products - create product
router.post("/", async (req, res) => {
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

    if (!code || !name) {
      return res
        .status(400)
        .json({ message: "Code and name are required" });
    }

    const existing = await Product.findOne({ code });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A product with this code already exists" });
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
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Error creating product" });
  }
});

// PUT /api/products/:id - update product by Mongo _id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE /api/products/:id - delete product by Mongo _id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
