const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const equipmentUnitSchema = new Schema(
  {
    serialNumber: {
      type: String,
      unique: true,
    }, // stored as string because could be alphanumeric
    //some equipment has no s/n
    status: {
      type: String,
      enum: ["In Store", "Outside Store"],
      default: "In Store",
    },
    description: {
      type: String,
      default: "",
    },
    loanStartDate: {
      type: Date,
    },
    loanEndDate: {
      type: Date,
    },
    lastServicing: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("EquipmentUnit", equipmentUnitSchema);
