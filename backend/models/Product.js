const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String },
  subcategory: { type: String },
  quantity: { type: Number, default: 0 },
  unit: { type: String },
  location: { type: String },
  supplier: { type: String },
  description: { type: String },
  stock: { type: Number, default: 0 },
  status: { type: String, default: "ACTIVE" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
