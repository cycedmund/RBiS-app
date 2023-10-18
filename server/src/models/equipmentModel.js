const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const equipmentSchema = new Schema(
  {
    equipment: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
      enum: ["In", "Out"],
      default: ["In"],
    },
    description: {
      type: String,
    },
    loanStartDate: {
      type: Date,
    },
    loanEndDate: {
      type: Date,
    },
    serialNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Equipment", equipmentSchema);
