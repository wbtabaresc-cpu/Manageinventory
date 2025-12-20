const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    console.error("Get category by id error:", err);
    res.status(500).json({ message: "Error fetching category" });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, status } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    name = String(name).trim();

    if (status === "Activo") status = "ACTIVE";
    if (status === "Inactivo") status = "INACTIVE";
    status = status || "ACTIVE";

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({
      name,
      description: description || "",
      status,
    });

    res.status(201).json({ message: "Category created successfully", category });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Error creating category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { name, description, status } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (typeof name === "string") name = name.trim();

    if (status === "Activo") status = "ACTIVE";
    if (status === "Inactivo") status = "INACTIVE";

    if (name && name.toLowerCase() !== (category.name || "").trim().toLowerCase()) {
      const existing = await Category.findOne({
        name,
        _id: { $ne: category._id },
      });

      if (existing) {
        return res.status(400).json({ message: "Category already exists" });
      }

      category.name = name;
    }

    if (description !== undefined) category.description = description;
    if (status !== undefined) category.status = status;

    await category.save();
    res.json({ message: "Category updated", category });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ message: "Error updating category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Error deleting category" });
  }
});

module.exports = router;
