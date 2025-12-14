const express = require("express");
const Location = require("../models/Location");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    console.error("Get locations error:", err);
    res.status(500).json({ message: "Error fetching locations" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    console.error("Get location by id error:", err);
    res.status(500).json({ message: "Error fetching location" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { warehouse, aisle, rack, description, status } = req.body;

    if (warehouse === undefined || aisle === undefined || !rack) {
      return res.status(400).json({
        message: "warehouse, aisle and rack are required",
      });
    }

    const wh = Number(warehouse);
    const ai = Number(aisle);

    if (Number.isNaN(wh) || Number.isNaN(ai)) {
      return res.status(400).json({
        message: "warehouse and aisle must be numbers",
      });
    }

    const location = await Location.create({
      warehouse: wh,
      aisle: ai,
      rack,
      description: description || "",
      status: status || "ACTIVE",
    });

    res.status(201).json({
      message: "Location created successfully",
      location,
    });
  } catch (err) {
    console.error("Create location error:", err);
    res.status(500).json({ message: "Error creating location" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    if (req.body.warehouse !== undefined) {
      const wh = Number(req.body.warehouse);
      if (Number.isNaN(wh)) {
        return res.status(400).json({ message: "warehouse must be a number" });
      }
      location.warehouse = wh;
    }

    if (req.body.aisle !== undefined) {
      const ai = Number(req.body.aisle);
      if (Number.isNaN(ai)) {
        return res.status(400).json({ message: "aisle must be a number" });
      }
      location.aisle = ai;
    }

    if (req.body.rack !== undefined) {
      location.rack = req.body.rack;
    }

    if (req.body.description !== undefined) {
      location.description = req.body.description;
    }

    if (req.body.status !== undefined) {
      location.status = req.body.status;
    }

    await location.save();

    res.json({
      message: "Location updated successfully",
      location,
    });
  } catch (err) {
    console.error("Update location error:", err);
    res.status(500).json({ message: "Error updating location" });
  }
});


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
