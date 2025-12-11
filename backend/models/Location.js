const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    warehouse: { type: Number, required: true },   // Bodega
    aisle: { type: Number, required: true },       // Pasillo
    rack: { type: String, required: true },        // Rack
    description: { type: String },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
