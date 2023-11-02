import Swal from "sweetalert2";
import { deleteEquipmentService } from "../../utilities/equipment/equipment-service";
import { errorSwal } from "../../utilities/swal/errorSwal";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { calculateCounts } from "../setStateHelpers/calculateCounts";

export const deleteEquipmentHelper = async (
  selectedUnits,
  setSelectedUnits,
  setEquipment,
  navigateToDashboard
) => {
  console.log("selected", selectedUnits);
  try {
    const result = await Swal.fire({
      ...swalSettings("Are you sure?", "question"),
      text: "Proceed to delete equipment?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
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
        const categoriesWithUnits = filteredEquipmentUnits.map(
          (item) => item.category
        );
        const updatedCategories = prevEquipment.categories.filter((category) =>
          categoriesWithUnits.includes(category)
        );
        console.log(updatedCategories);
        const updatedCounts = calculateCounts(filteredEquipmentUnits);

        if (updatedCategories.length !== prevEquipment.categories.length) {
          navigateToDashboard();
        }

        return {
          ...prevEquipment,
          categories: updatedCategories,
          equipment: filteredEquipmentUnits,
          counts: updatedCounts,
          totalEquipmentCount: totalEquipmentCount,
        };
      });

      setSelectedUnits([]);
      Swal.fire(swalSettings("Deleted!", "success"));
    }
  } catch (err) {
    console.error("Error:", err);
    errorSwal(err);
  }
};
