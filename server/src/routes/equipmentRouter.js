const express = require("express");
const { verifyAdminInstructor, verifyAll } = require("../config/isAuthorised");
const router = express.Router();
const equipmentCtrl = require("../controllers/equipmentCtrl");

router.get("/", verifyAll, equipmentCtrl.getAllEquipment);
router.post("/new", verifyAdminInstructor, equipmentCtrl.addEquipment);
router.put(
  "/:equipmentUnitID/update",
  verifyAdminInstructor,
  equipmentCtrl.updateOneUnit
);
router.patch(
  "/:equipmentUnitID/location/edit",
  verifyAll,
  equipmentCtrl.editLocation
);
router.patch(
  "/:equipmentUnitID/description/edit",
  verifyAll,
  equipmentCtrl.editDescription
);
router.delete(
  "/:equipmentID",
  verifyAdminInstructor,
  equipmentCtrl.deleteEquipment
);

module.exports = router;
