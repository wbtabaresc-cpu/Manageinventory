const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    warehouse: { type: Number, required: true },
    aisle: { type: Number, required: true },
    rack: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    label: { type: String, unique: true },
  },
  { timestamps: true }
);

locationSchema.pre("validate", function () {
  this.label = `Bodega ${this.warehouse} - Pasillo ${this.aisle} - Rack ${this.rack}`;
});

module.exports = mongoose.model("Location", locationSchema);
