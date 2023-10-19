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

async function updateWpnStoreIC(req, res) {
  const courseID = req.params.courseID;
  debug("retrieve courseID:", courseID);
  const { traineeID } = req.body;
  debug("retrieve traineeID:", traineeID);

  try {
    let course = await Course.findById(courseID);
    debug("retrieve Course:", course);
    if (!course) {
      return sendResponse(res, 404, null, "Course not found");
    }

    course.weaponStoreIC = traineeID;
    await course.save();

    // lean required because of axios!
    course = await Course.findById(courseID)
      .populate("trainees")
      .populate("instructors")
      .populate("courseIC")
      .populate("weaponStoreIC")
      .sort({ course: 1 });

    sendResponse(res, 200, { course }, "Weapon Store IC updated successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error modifying IC");
  }
}

module.exports = { getAllCourses, updateWpnStoreIC };
