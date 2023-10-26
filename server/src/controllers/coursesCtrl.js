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

    sendResponse(res, 200, { course }, "IC appointed successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error appointing IC");
  }
}

async function addInstructor(req, res) {
  const { user } = req.auth;
  debug("user", user);
  const courseID = req.params.courseID;
  debug("retrieve courseID:", courseID);

  try {
    let course = await Course.findById(courseID);
    debug("retrieve Course:", course);
    if (!course) {
      return sendResponse(res, 404, null, "Course not found");
    }
    debug("instructors:", course.instructors);
    if (user.role === "instructor" && !course.instructors.includes(user._id)) {
      course.instructors.push(user._id);
      await course.save();
      const updatedCourse = await Course.findById(courseID)
        .populate("trainees")
        .populate("instructors")
        .populate("courseIC")
        .populate("weaponStoreIC");

      sendResponse(
        res,
        200,
        { updatedCourse },
        "Instructor added successfully"
      );
    } else {
      throw new Error("Instructor already exists");
    }
  } catch (err) {
    sendResponse(res, 500, null, "Error adding instructor");
  }
}

async function deleteInstructor(req, res) {
  const { user } = req.auth;
  debug("user", user);
  const courseID = req.params.courseID;
  debug("retrieve courseID:", courseID);

  try {
    let course = await Course.findById(courseID);
    debug("retrieve Course:", course);
    if (!course) {
      return sendResponse(res, 404, null, "Course not found");
    }
    if (user.role === "instructor" && course.instructors.includes(user._id)) {
      course.instructors = course.instructors.filter(
        (instrID) => instrID.toString() !== user._id.toString()
      );

      await course.save();

      const updatedCourse = await Course.findById(courseID)
        .populate("trainees")
        .populate("instructors")
        .populate("courseIC")
        .populate("weaponStoreIC");

      sendResponse(
        res,
        200,
        { updatedCourse },
        "Instructor removed successfully"
      );
    } else {
      throw new Error("Unable to delete instructor");
    }
  } catch (err) {
    sendResponse(res, 500, null, "Error adding instructor");
  }
}

module.exports = { getAllCourses, updateIC, addInstructor, deleteInstructor };
