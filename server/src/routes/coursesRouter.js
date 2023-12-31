const express = require("express");
const {
  verifyTrainee,
  verifyAdminInstructor,
  // verifyAdmin,
} = require("../config/isAuthorised");
const router = express.Router();
const coursesCtrl = require("../controllers/coursesCtrl");

router.get("/", verifyAdminInstructor, coursesCtrl.getAllCourses);
router.get("/trainee", verifyTrainee, coursesCtrl.getAllCourses);
router.put("/:courseID/editIC", verifyAdminInstructor, coursesCtrl.updateIC);
router.patch(
  "/:courseID/instrs/:instrID/add",
  verifyAdminInstructor,
  coursesCtrl.addInstructor
);
router.delete(
  "/:courseID/instrs/:instrID/delete",
  verifyAdminInstructor,
  coursesCtrl.deleteInstructor
);
router.delete(
  "/:courseID/trainees/:traineeID/delete",
  verifyAdminInstructor,
  coursesCtrl.deleteTrainee
);

router.delete(
  "/:courseID/delete",
  verifyAdminInstructor,
  coursesCtrl.deleteCourse
);

module.exports = router;
