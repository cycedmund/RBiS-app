const sendResponse = require("../helpers/sendResponse");
const Course = require("../models/courseModel");
const { updateIcSchema } = require("../utilities/yup-schema");
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
      debug("find course:", courses);
    }
    courses.forEach((course) => {
      course.trainees.sort((a, b) =>
        a.formattedFullName.localeCompare(b.formattedFullName)
      );
    });

    sendResponse(res, 200, { courses: courses });
  } catch (err) {
    sendResponse(
      res,
      500,
      null,
      "Internal Server Error, please try again later"
    );
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
      throw new Error("Course not found");
    }
    await updateIcSchema.validate(req.body, { abortEarly: false });

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

    course.trainees.sort((a, b) =>
      a.formattedFullName.localeCompare(b.formattedFullName)
    );

    sendResponse(res, 200, { course }, "IC appointed successfully");
  } catch (err) {
    let status = 500;
    let message = "Internal Server Error";

    if (err.message === "Course not found") {
      status = 404;
      message = err.message;
    }

    if (err.name === "ValidationError") {
      debug(err.errors[0]);
      if (err.errors[0]) {
        status = 400;
        message = err.errors[0];
      }
      sendResponse(res, status, null, message);
    }
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
      throw new Error("Course not found");
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
      throw new Error("You are not an Instructor!");
    }
  } catch (err) {
    debug("err", err);
    let status = 500;
    let message = "Internal Server Error";

    if (err.message === "Course not found") {
      status = 404;
      message = err.message;
    }
    if (err.message === "You are not an Instructor!") {
      status = 400;
      message = err.message;
    }

    sendResponse(res, status, null, message);
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
      throw new Error("Course not found");
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
    let status = 500;
    let message = "Internal Server Error";
    if (err.message === "Course not found") {
      status = 404;
      message = err.message;
    }
    if (err.message === "Unable to delete instructor") {
      status = 400;
      message = err.message;
    }
    sendResponse(res, status, null, message);
  }
}

module.exports = { getAllCourses, updateIC, addInstructor, deleteInstructor };
