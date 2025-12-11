const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// POST /api/categories
router.post("/", async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A category with this name already exists" });
    }

    const category = await Category.create({
      name,
      description,
      status: status || "ACTIVE",
    });

    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Error creating category" });
  }
});

// PUT /api/categories/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated", category: updated });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: "Error updating category" });
  }
});

// DELETE /api/categories/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Error deleting category" });
  }
});

module.exports = router;
