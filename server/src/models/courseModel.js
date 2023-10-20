const mongoose = require("mongoose");
const {
  filterPresent,
  getThisCommonLocation,
} = require("../utilities/stats-service");
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    courseIC: { type: Schema.Types.ObjectId, ref: "User" },
    weaponStoreIC: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

courseSchema.virtual("totalPresent").get(filterPresent);
courseSchema.virtual("commonLocation").get(getThisCommonLocation);

module.exports = model("Course", courseSchema);
