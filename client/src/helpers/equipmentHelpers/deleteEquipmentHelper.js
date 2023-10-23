import Swal from "sweetalert2";
import { deleteEquipmentService } from "../../utilities/equipment/equipment-service";

export const deleteEquipmentHelper = async (
  selectedUnits,
  setSelectedUnits,
  setEquipment
) => {
  try {
    await Promise.all(
      selectedUnits.map(async (unitID) => {
        await deleteEquipmentService(unitID);
      })
    );

    setEquipment((prevEquipment) => {
      const updatedEquipment = prevEquipment.equipment.map((item) => {
        const updatedUnits = item.units.filter(
          (unit) => !selectedUnits.includes(unit._id)
        );
        return { ...item, units: updatedUnits };
      });
      return { ...prevEquipment, equipment: updatedEquipment };
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
