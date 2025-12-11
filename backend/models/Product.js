const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // e.g. "P001"
    name: { type: String, required: true },
    category: { type: String },
    subcategory: { type: String },
    quantity: { type: Number, default: 0 },
    unit: { type: String },          // e.g. "Meters", "Kg", "Units"
    location: { type: String },      // e.g. "Warehouse 1 - Aisle 2 - Rack A"
    supplier: { type: String },
    description: { type: String },
    stock: { type: Number, default: 0 },
    status: { type: String, default: "ACTIVE" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
