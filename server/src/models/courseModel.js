const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    trainees: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Course", courseSchema);
