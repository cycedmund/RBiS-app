import Swal from "sweetalert2";
import { deleteEquipmentService } from "../../utilities/equipment/equipment-service";
import { calculateCounts } from "../setStateHelpers/calculateCounts";

export const deleteEquipmentHelper = async (
  selectedUnits,
  setSelectedUnits,
  setEquipment
) => {
  try {
    const response = await Promise.all(
      selectedUnits.map(async (unitID) => {
        return await deleteEquipmentService(unitID);
      })
    );

    const totalEquipmentCount =
      response[response.length - 1].totalEquipmentCount;

    setEquipment((prevEquipment) => {
      const updatedEquipment = prevEquipment.equipment.map((item) => {
        const updatedUnits = item.units.filter(
          (unit) => !selectedUnits.includes(unit._id)
        );
        return { ...item, units: updatedUnits };
      });
      const filteredEquipmentUnits = updatedEquipment.filter(
        (item) => item.units.length > 0
      );
      console.log("in delete filtered:", filteredEquipmentUnits);
      const updatedCounts = calculateCounts(filteredEquipmentUnits);
      return {
        ...prevEquipment,
        equipment: filteredEquipmentUnits,
        counts: updatedCounts,
        totalEquipmentCount: totalEquipmentCount,
      };
    });

    setSelectedUnits([]);
    Swal.fire(
      "Equipment Deleted",
      "All selected equipment have been deleted.",
      "success"
    );
  } catch (err) {
    console.error("Error:", err);
    Swal.fire(
      "Error",
      "An error occurred while deleting selected equipment.",
      "error"
    );
  }
};
