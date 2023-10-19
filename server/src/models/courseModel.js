const mongoose = require("mongoose");
const {
  filterPresent,
  getCommonLocation,
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
courseSchema.virtual("commonLocation").get(getCommonLocation);

module.exports = model("Course", courseSchema);

// courses.forEach((course) => {
//   const traineesPresent = filterPresent(course.trainees);
//   debug("trainees present:", traineesPresent.length);
//   presentNum.push(traineesPresent.length);
//   debug("trainees present in course:", course);
//   commonLocation.push(getCommonLocation(course.trainees));
// });
