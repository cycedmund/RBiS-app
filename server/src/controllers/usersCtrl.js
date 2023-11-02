const User = require("../models/userModel");
const Course = require("../models/courseModel");
const debug = require("debug")("RBiS:server:controllers:usersCtrl");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const createJWT = require("../helpers/createJWT");
const { getCommonLocation } = require("../utilities/equipmentStats-service");
const { signUpSchema, loginSchema } = require("../utilities/yup-schema");

async function createUser(req, res) {
  try {
    await signUpSchema.validate(req.body, { abortEarly: false });

    const newUser = await User.create({
      ...req.body,
      status: [
        {
          status: "Present",
          location: "Bunk",
          description: null,
        },
      ],
    });
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
      debug("err:", err.errors);
      if (err.errors[0]) {
        status = 403;
        message = "Go away!";
      }
      if (err.errors.rank && err.errors.rank.kind === "enum") {
        status = 403;
        message = "Go away!";
      }
    }
    if (err.code === 11000 && err.keyValue.username) {
      status = 409;
      message = "Username already exists";
    } else if (err.code === 11000 && err.keyValue.fullName) {
      status = 409;
      message = "Full name already exists";
    } else if (err.code === 11000 && err.keyValue.email) {
      status = 409;
      message = "Email already exists";
    }
    sendResponse(res, status, null, message);
  }
}

async function loginUser(req, res) {
  debug("login user body: %o", req.body);
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
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

    if (err.name === "ValidationError") {
      debug("err:", err.errors);
      if (err.errors[0]) {
        status = 400;
        message = "Please use the login link!";
      }
    }
    // throw --> {Error}:  {message}

    if (err.message === "User does not exist.") {
      status = 404;
      message = err.message;
    }
    if (err.message === "Incorrect password!") {
      status = 401;
      message = err.message;
      debug("password message", message);
    }
    sendResponse(res, status, null, message);
  }
}

async function updateTraineeStatus(req, res) {
  const { traineeID } = req.params;
  debug("traineeID retrieved:", traineeID);
  debug("body", req.body);

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

    // const commonLocation = getCommonLocation(course.trainees);
    const commonLocation = getCommonLocation(totalPresent);
    debug("common", commonLocation);

    trainee.toObject();
    debug("trainee saved status:", trainee);
    sendResponse(
      res,
      200,
      { trainee, totalPresent, commonLocation },
      "Status updated successfully"
    );
  } catch (err) {
    debug("err %o", err);
    let status = 500;
    let message = "Internal Server Error";
    if (err.name === "ValidationError") {
      if (
        err.errors["status.0.location"] &&
        err.errors["status.0.location"].kind === "enum"
      ) {
        (status = 403), (message = "Go away");
      }
      if (
        err.errors["status.0.status"] &&
        err.errors["status.0.status"]?.kind === "enum"
      ) {
        (status = 403), (message = "Go away");
      }
    }
    sendResponse(res, status, null, message);
  }
}

module.exports = { createUser, loginUser, updateTraineeStatus };
