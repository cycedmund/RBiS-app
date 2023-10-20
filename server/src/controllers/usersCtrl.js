const User = require("../models/userModel");
const Course = require("../models/courseModel");
const debug = require("debug")("RBiS:server:controllers:usersCtrl");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const createJWT = require("../helpers/createJWT");
const { getCommonLocation } = require("../utilities/stats-service");

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);

    if (req.body.role === "trainee" && req.body.course !== "nil") {
      const courseExist = await Course.findOne({ course: req.body.course });
      debug("course: %o", courseExist);

      if (courseExist) {
        await Course.findByIdAndUpdate(courseExist._id, {
          $addToSet: { trainees: newUser._id },
        });
      } else {
        await Course.create({
          course: req.body.course,
          trainees: [newUser._id],
        });
      }
    }

    const token = createJWT(newUser);
    debug("token", token);
    sendResponse(res, 201, { token: token });
  } catch (err) {
    debug("Error creating: %o", err);

    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
      if (err.errors.password.kind === "minlength") {
        status = 400;
        message = "Password is too short. Please input at least 8 characters";
      }
    }
    if (err.code === 11000 && err.keyValue.username) {
      status = 409;
      message = "Username already exists.";
    } else if (err.code === 11000 && err.keyValue.fullName) {
      status = 409;
      message = "Name already exists.";
    }
    sendResponse(res, status, null, message);
  }
}

async function loginUser(req, res) {
  debug("login user body: %o", req);
  try {
    const user = await User.findOne({ username: req.body.username });
    debug("user", user);
    if (user === null) throw new Error("User does not exist.");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Incorrect password!");
    const token = createJWT(user);
    sendResponse(res, 200, { token: token });
  } catch (err) {
    debug("Error creating: %o", err);
    let status = 401;
    let message = "Unauthorised";

    if (err.message === "User does not exist.") {
      status = 404;
      message = err.message;
    }
    if (err.message === "Incorrect password!") {
      status = 401;
      message = err.message;
    }
    sendResponse(res, status, null, message);
  }
}

async function updateTraineeStatus(req, res) {
  const { traineeID } = req.params;
  debug("traineeID retrieved:", traineeID);

  try {
    const trainee = await User.findById(traineeID);
    debug("trainee details:", trainee);
    if (trainee.status.length >= 15) {
      trainee.status.pop();
    }
    trainee.status.unshift(req.body);
    await trainee.save();
    const course = await Course.findOne({ trainees: trainee._id }).populate(
      "trainees"
    );
    debug("course", course);

    const totalPresent = await User.find({
      _id: { $in: course.trainees },
      "status.0.status": { $in: ["Present", "Light Duty"] },
    });
    debug("find present:", totalPresent);

    const commonLocation = getCommonLocation(course.trainees);
    debug("common", commonLocation);

    trainee.toObject(); //! lean no virtuals
    debug("trainee saved status:", trainee);
    sendResponse(
      res,
      200,
      { trainee, totalPresent, commonLocation },
      "Status updated successfully"
    );
  } catch (err) {
    sendResponse(res, 500, null, "Error updating status");
  }
}

module.exports = { createUser, loginUser, updateTraineeStatus };

// async function deactivate(req, res) {
//   debug("delete user: %o", req.user._id);
//   try {
//     await User.findOneAndDelete({
//       _id: req.user._id,
//     });
//     await Wardrobe.deleteMany({
//       user: req.user._id,
//     });
//     await Outfit.deleteMany({
//       user: req.user._id,
//     });
//     sendResponse(res, 200);
//   } catch (err) {
//     sendResponse(res, 500, null, "Error deleting account");
//   }
// }
