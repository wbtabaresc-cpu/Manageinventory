const express = require("express");
const Location = require("../models/Location");

const router = express.Router();

// GET /api/locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().sort({
      warehouse: 1,
      aisle: 1,
      rack: 1,
    });
    res.json(locations);
  } catch (err) {
    console.error("Get locations error:", err);
    res.status(500).json({ message: "Error fetching locations" });
  }
});

// POST /api/locations
router.post("/", async (req, res) => {
  try {
    const { warehouse, aisle, rack, description, status } = req.body;

    if (!warehouse || !aisle || !rack) {
      return res.status(400).json({
        message: "Warehouse, aisle and rack are required",
      });
    }

    const location = await Location.create({
      warehouse,
      aisle,
      rack,
      description,
      status: status || "ACTIVE",
    });

    res.status(201).json({ message: "Location created", location });
  } catch (err) {
    console.error("Create location error:", err);
    res.status(500).json({ message: "Error creating location" });
  }
});

// PUT /api/locations/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.json({ message: "Location updated", location: updated });
  } catch (err) {
    console.error("Update location error:", err);
    res.status(500).json({ message: "Error updating location" });
  }
});

// DELETE /api/locations/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Location.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location deleted" });
  } catch (err) {
    console.error("Delete location error:", err);
    res.status(500).json({ message: "Error deleting location" });
  }
});

module.exports = router;
