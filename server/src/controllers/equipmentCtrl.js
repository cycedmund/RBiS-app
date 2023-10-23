const sendResponse = require("../helpers/sendResponse");
const debug = require("debug")("RBiS:server:controllers:equipmentCtrl");
const Equipment = require("../models/equipmentModel");
const EquipmentUnit = require("../models/equipmentUnitModel");

async function getAllEquipment(req, res) {
  debug("req.user %o:", req.auth);
  // const { user } = req.auth;

  try {
    const equipmentData = await Equipment.find().populate("units");
    debug("equipment:", equipmentData);
    const categories = await Equipment.distinct("category");
    debug("categories:", categories);

    sendResponse(res, 200, {
      categories: categories,
      equipment: equipmentData,
    });
  } catch (err) {
    sendResponse(res, 500, null, "Error getting equipment");
  }
}

async function updateOneUnit(req, res) {
  debug("USER editing %o:", req.auth.user);
  debug("equipmentID", req.params.equipmentID);
  const { equipmentID } = req.params;
  debug("body", req.body);
  const { serialNumber, loanStartDate, loanEndDate } = req.body;

  try {
    const updatedEquipmentUnit = await EquipmentUnit.findByIdAndUpdate(
      equipmentID,
      {
        serialNumber,
        loanStartDate,
        loanEndDate,
        status: "In Store",
        description: "",
      },
      { new: true }
    );

    debug("updated Equipment:", updatedEquipmentUnit);

    if (!updatedEquipmentUnit) {
      return sendResponse(res, 404, null, "Equipment not found");
    }

    sendResponse(res, 200, { updatedEquipmentUnit });
  } catch (err) {
    sendResponse(res, 500, null, "Error updating Equipment");
  }
}

async function editLocation(req, res) {
  debug("equipmentID", req.params.equipmentID);
  const { equipmentID } = req.params;
  debug("body", req.body);
  const { status } = req.body;

  try {
    const updatedLocation = await EquipmentUnit.findByIdAndUpdate(
      equipmentID,
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );

    debug("updated Location:", updatedLocation);

    if (!updatedLocation) {
      return sendResponse(res, 404, null, "Equipment not found");
    }

    sendResponse(res, 200, { updatedLocation });
  } catch (err) {
    sendResponse(res, 500, null, "Error updating Equipment");
  }
}

async function editDescription(req, res) {
  debug("equipmentID", req.params.equipmentID);
  const { equipmentID } = req.params;
  debug("body", req.body);
  const { description } = req.body;

  try {
    const updatedDescription = await EquipmentUnit.findByIdAndUpdate(
      equipmentID,
      {
        $set: {
          description: description,
        },
      },
      { new: true }
    );

    debug("updated Description:", updatedDescription);

    if (!updatedDescription) {
      return sendResponse(res, 404, null, "Equipment not found");
    }

    sendResponse(res, 200, { updatedDescription });
  } catch (err) {
    sendResponse(res, 500, null, "Error updating Equipment");
  }
}

module.exports = {
  getAllEquipment,
  updateOneUnit,
  editLocation,
  editDescription,
};
