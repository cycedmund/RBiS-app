import Swal from "sweetalert2";
import { editEquipmentLocationService } from "../../utilities/equipment/equipment-service";
import { calculateCounts } from "../setStateHelpers/calculateCounts";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editLocationHelper = async (unit, equipment, setEquipment) => {
  const { value: newLocation } = await Swal.fire({
    title: "Edit Location",
    input: "select",
    inputOptions: {
      "In Store": "In Store",
      "Outside Store": "Outside Store",
    },
    inputPlaceholder: "Select a new location",
    inputValue: unit.status,
    showCancelButton: true,
    confirmButtonText: "Save",
    inputValidator: (value) => {
      if (!value) {
        return "You need to select a location!";
      }
    },
    didOpen: () => {
      Swal.getInput().focus();
      document.querySelectorAll(".swal2-select option").forEach((option) => {
        if (option.value === unit.status) {
          option.disabled = true;
        }
      });
    },
  });

  if (newLocation) {
    try {
      const updatedLocation = await editEquipmentLocationService(
        unit._id,
        newLocation
      );
      const totalEquipmentCount = updatedLocation.data.totalEquipmentCount;
      const updatedEquipment = updateEquipmentUnit(
        equipment,
        unit,
        updatedLocation.data.updatedLocation
      );
      const updatedCounts = calculateCounts(updatedEquipment);
      setEquipment({
        ...equipment,
        equipment: updatedEquipment,
        totalEquipmentCount: totalEquipmentCount,
        counts: updatedCounts,
      });
      Swal.fire("Location Updated!", "", "success");
    } catch (err) {
      Swal.fire("Error", "An error occurred while saving changes.", "error");
    }
  }
};
