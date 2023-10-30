const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { equipmentOptions } = require("../config/selectOptions");

const equipmentSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["RBS 70", "PSTAR", "Signal", "Miscellaneous"],
      required: true,
    },
    equipment: {
      type: String,
      enum: equipmentOptions,
      required: true,
    },
    units: [{ type: Schema.Types.ObjectId, ref: "EquipmentUnit" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Equipment", equipmentSchema);
