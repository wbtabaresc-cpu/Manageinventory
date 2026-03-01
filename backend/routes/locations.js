const express = require("express");
const Location = require("../models/Location");
const auth = require("../middleware/auth");

const router = express.Router();

// Obtener todas las ubicaciones registradas
router.get("/", auth, async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Error al cargar ubicaciones" });
  }
});

// Buscar una ubicación específica por su ID
router.get("/:id", auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "No se encontró la ubicación" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar ubicación" });
  }
});

// Crear nueva ubicación (valida que bodega y pasillo sean números)
router.post("/", auth, async (req, res) => {
  try {
    const { warehouse, aisle, rack, description, status } = req.body;

    if (warehouse === undefined || aisle === undefined || !rack) {
      return res.status(400).json({ message: "Bodega, pasillo y estante son obligatorios" });
    }

    const wh = Number(warehouse);
    const ai = Number(aisle);

    if (isNaN(wh) || isNaN(ai)) {
      return res.status(400).json({ message: "Bodega y pasillo deben ser numéricos" });
    }

    const location = await Location.create({
      warehouse: wh,
      aisle: ai,
      rack,
      description: description || "",
      status: status || "ACTIVE",
    });

    res.status(201).json({ message: "Ubicación creada", location });
  } catch (err) {
    res.status(500).json({ message: "Error al guardar ubicación" });
  }
});

// Actualizar datos de una ubicación existente
router.put("/:id", auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "No existe la ubicación" });

    if (req.body.warehouse !== undefined) location.warehouse = Number(req.body.warehouse);
    if (req.body.aisle !== undefined) location.aisle = Number(req.body.aisle);
    if (req.body.rack !== undefined) location.rack = req.body.rack;
    if (req.body.description !== undefined) location.description = req.body.description;
    if (req.body.status !== undefined) location.status = req.body.status;

    await location.save();
    res.json({ message: "Ubicación actualizada", location });
  } catch (err) {
    res.status(500).json({ message: "Error al editar ubicación" });
  }
});

// Eliminar ubicación de la base de datos
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Location.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Ubicación no encontrada" });
    res.json({ message: "Ubicación borrada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al borrar ubicación" });
  }
});

module.exports = router;