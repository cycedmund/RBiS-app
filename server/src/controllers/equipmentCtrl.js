const sendResponse = require("../helpers/sendResponse");
const debug = require("debug")("RBiS:server:controllers:equipmentCtrl");
const Equipment = require("../models/equipmentModel");
const EquipmentUnit = require("../models/equipmentUnitModel");
const { getCounts } = require("../utilities/equipmentStats-service");
const {
  sortEquipment,
  sortEquipmentUnit,
} = require("../utilities/sort-service");
const {
  editEquipmentSchema,
  addEquipmentSchema,
} = require("../utilities/yup-schema");

async function getAllEquipment(req, res) {
  debug("req.user %o:", req.auth);

  try {
    const equipmentData = await Equipment.find()
      .populate({
        path: "units",
        options: { sort: { serialNumber: 1 } },
      })
      .sort({ equipment: 1 });
    sortEquipment(equipmentData);

    debug("equipment:", equipmentData);
    const categories = await Equipment.distinct("category");
    debug("categories:", categories);

    const totalEquipmentCount = await EquipmentUnit.countDocuments({});
    debug("total Count:", totalEquipmentCount);

    const counts = getCounts(categories, equipmentData);
    debug("counts", counts);

    sendResponse(res, 200, {
      categories: categories,
      equipment: equipmentData,
      totalEquipmentCount: totalEquipmentCount,
      counts: counts,
    });
  } catch (err) {
    sendResponse(res, 500, null, "Error getting equipment");
  }
}

async function updateOneUnit(req, res) {
  debug("USER editing %o:", req.auth.user);
  debug("equipmentUnitID", req.params.equipmentID);
  const { equipmentUnitID } = req.params;
  debug("body", req.body);
  const { serialNumber, loanStartDate, loanEndDate } = req.body;

  try {
    await editEquipmentSchema.validate(req.body, { abortEarly: false });

    const updatedEquipmentUnit = await EquipmentUnit.findByIdAndUpdate(
      equipmentUnitID,
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
    debug("Error creating: %o", err);

    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
      debug("err:", err.errors);
      if (err.errors[0]) {
        status = 403;
        message = "Go away!";
      }
    }
    if (err.code === 11000 && err.keyValue.serialNumber) {
      status = 409;
      message = "Serial Number already exists";
    }
    sendResponse(res, status, null, message);
  }
}

async function editLocation(req, res) {
  debug("equipment Unit ID", req.params.equipmentUnitID);
  const { equipmentUnitID } = req.params;
  debug("body", req.body);
  const { status } = req.body;
  try {
    const updatedLocation = await EquipmentUnit.findByIdAndUpdate(
      equipmentUnitID,
      {
        $set: {
          status: status,
        },
      },
      { new: true, runValidators: true }
      // using findbyId would not enforce enum validation
    );
    debug("updated Location:", updatedLocation);

    if (!updatedLocation) {
      return sendResponse(res, 404, null, "Equipment not found");
    }
    const totalEquipmentCount = await EquipmentUnit.countDocuments({});
    debug("total Count:", totalEquipmentCount);

    sendResponse(res, 200, { updatedLocation, totalEquipmentCount });
  } catch (err) {
    let status = 500;
    let message = "Internal Server Error";
    debug("err %o:", err.errors);
    if (err.name === "ValidationError") {
      if (err.errors.status && err.errors.status.kind === "enum") {
        (status = 403), (message = "Go away");
      }
    }

    sendResponse(res, status, null, message);
  }
}

async function editDescription(req, res) {
  debug("equipmentUnitID", req.params.equipmentUnitID);
  const { equipmentUnitID } = req.params;
  debug("body", req.body);
  const { description } = req.body;

  try {
    const updatedDescription = await EquipmentUnit.findByIdAndUpdate(
      equipmentUnitID,
      {
        $set: {
          description: description,
        },
      },
      { new: true }
    );

    debug("updated Description:", updatedDescription);

    if (!updatedDescription) {
      throw new Error("Equipment not found");
    }

    sendResponse(res, 200, { updatedDescription });
  } catch (err) {
    let status = 500;
    let message = "Internal Server Error";
    if (err.message === "Equipment not found") {
      status = 404;
      message = err.message;
    } else {
      status = 400;
      message = "Error updating description";
    }
    sendResponse(res, status, null, message);
  }
}

async function deleteEquipment(req, res) {
  debug("equipmentID to delete", req.params.equipmentID);
  const { equipmentID } = req.params;
  debug("body", req.body);

  try {
    const deletedEquipment = await EquipmentUnit.findByIdAndDelete(equipmentID);

    if (!deletedEquipment) {
      return sendResponse(res, 404, null, "Equipment not found");
    }

    const totalEquipmentCount = await EquipmentUnit.countDocuments({});
    debug("total Count:", totalEquipmentCount);

    const updatedEquipment = await Equipment.findOneAndUpdate(
      { units: equipmentID },
      { $pull: { units: equipmentID } },
      { new: true }
    );
    debug("updated equipment:", updatedEquipment);

    if (updatedEquipment && updatedEquipment.units.length === 0) {
      await Equipment.findByIdAndDelete(updatedEquipment._id);
    }

    sendResponse(
      res,
      200,
      { totalEquipmentCount },
      "Equipment deleted successfully"
    );
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting Equipment");
  }
}

async function addEquipment(req, res) {
  debug("body", req.body.data);
  // Add next servicing by calculating from the frequency

  const {
    category,
    equipment,
    serialNumber,
    loanStartDate,
    loanEndDate,
    lastServicing,
    // servicingFrequency,
  } = req.body.data;

  debug("category and equipment", category, equipment);

  try {
    // let existingEquipment = await Equipment.findOne({
    //   category: category.value,
    //   equipment: equipment.value,
    // });
    await addEquipmentSchema.validate(req.body.data, { abortEarly: false });

    let existingEquipment = await Equipment.findOne({
      category: category,
      equipment: equipment,
    });

    if (!existingEquipment) {
      try {
        existingEquipment = await Equipment.create({
          category,
          equipment,
          units: [],
        });
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    }

    const newEquipmentUnit = await EquipmentUnit.create({
      serialNumber,
      status: "In Store",
      description: "",
      loanStartDate,
      loanEndDate,
      lastServicing,
    });

    existingEquipment.units.push(newEquipmentUnit._id);
    await existingEquipment.save();
    debug("new:", newEquipmentUnit);
    const updatedEquipment = await Equipment.findById(
      existingEquipment._id
    ).populate({
      path: "units",
      options: { sort: { serialNumber: 1 } },
    });
    sortEquipmentUnit(updatedEquipment);
    const totalEquipmentCount = await EquipmentUnit.countDocuments({});

    debug("updated:", updatedEquipment);
    sendResponse(res, 200, { updatedEquipment, totalEquipmentCount });
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
    }
    if (err.code === 11000 && err.keyValue.serialNumber) {
      status = 409;
      message = "Serial Number already exists";
    }
    sendResponse(res, status, null, message);
  }
}

module.exports = {
  getAllEquipment,
  updateOneUnit,
  editLocation,
  editDescription,
  deleteEquipment,
  addEquipment,
};
