const express = require("express");
const { verifyAdminInstructor, verifyAll } = require("../config/isAuthorised");
const router = express.Router();
const equipmentCtrl = require("../controllers/equipmentCtrl");

router.get("/", verifyAll, equipmentCtrl.getAllEquipment);
router.put(
  "/:equipmentID/update",
  verifyAdminInstructor,
  equipmentCtrl.updateOneUnit
);
router.patch(
  "/:equipmentID/location/edit",
  verifyAll,
  equipmentCtrl.editLocation
);
router.patch(
  "/:equipmentID/location/edit",
  verifyAll,
  equipmentCtrl.editLocation
);
router.patch(
  "/:equipmentID/description/edit",
  verifyAll,
  equipmentCtrl.editDescription
);

module.exports = router;
