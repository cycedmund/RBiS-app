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
  "/:courseID/:instrID/add",
  verifyAdminInstructor,
  coursesCtrl.addInstructor
);
router.delete(
  "/:courseID/:instrID/delete",
  verifyAdminInstructor,
  coursesCtrl.deleteInstructor
);

module.exports = router;
