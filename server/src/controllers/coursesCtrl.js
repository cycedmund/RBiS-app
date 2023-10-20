const sendResponse = require("../helpers/sendResponse");
const Course = require("../models/courseModel");
const debug = require("debug")("RBiS:server:controllers:coursesCtrl");

async function getAllCourses(req, res) {
  debug("req.user %o:", req.auth);
  const { user } = req.auth;
  let courses;
  try {
    if (user.role === "instructor" || user.role === "admin") {
      courses = await Course.find()
        .populate("trainees")
        .populate("instructors")
        .populate("courseIC")
        .populate("weaponStoreIC")
        .sort({ course: 1 });
    } else {
      courses = await Course.find({ trainees: user._id })
        .populate("trainees")
        .populate("instructors")
        .populate("courseIC")
        .populate("weaponStoreIC")
        .sort({ course: 1 });
    }

    sendResponse(res, 200, { courses: courses });
  } catch (err) {
    sendResponse(res, 500, null, "Error getting courses");
  }
}

async function updateIC(req, res) {
  const courseID = req.params.courseID;
  debug("retrieve courseID:", courseID);
  const { traineeID, IC } = req.body;
  debug("retrieve traineeID & IC:", traineeID, IC);

  try {
    let course = await Course.findById(courseID);
    debug("retrieve Course:", course);
    if (!course) {
      return sendResponse(res, 404, null, "Course not found");
    }

    if (IC === "weaponStoreIC") {
      course.weaponStoreIC = traineeID;
    } else if (IC === "courseIC") {
      course.courseIC = traineeID;
    }

    await course.save();
    course = await Course.findById(courseID)
      .populate("trainees")
      .populate("instructors")
      .populate("courseIC")
      .populate("weaponStoreIC");

    sendResponse(res, 200, { course }, "Weapon Store IC updated successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error appointing IC");
  }
}

module.exports = { getAllCourses, updateIC };
