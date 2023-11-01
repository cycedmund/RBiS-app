const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");
const { verifyTrainee, isAuthorised } = require("../config/isAuthorised");

router.post("/signup", usersCtrl.createUser);
router.post("/login", usersCtrl.loginUser);
router.post(
  "/:traineeID/update",
  // isAuthorised,
  verifyTrainee,
  usersCtrl.updateTraineeStatus
);

module.exports = router;
