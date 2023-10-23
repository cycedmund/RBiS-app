import Swal from "sweetalert2";
import { editEquipmentLocationService } from "../../utilities/equipment/equipment-service";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editLocationHelper = async (unit, equipment, setEquipment) => {
  const { value: newLocation } = await Swal.fire({
    title: "Edit Location",
    input: "select",
    inputOptions: {
      "In Store": "In Store",
      "Outside Store": "Outside Store",
      "In Cage": "In Cage",
      "Outside Cage": "Outside Cage",
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
    },
  });

  if (newLocation) {
    try {
      const updatedLocation = await editEquipmentLocationService(
        unit._id,
        newLocation
      );
      console.log(updatedLocation);
      const updatedEquipment = updateEquipmentUnit(
        equipment,
        unit,
        updatedLocation.data.updatedLocation
      );
      setEquipment({ ...equipment, equipment: updatedEquipment });
      Swal.fire("Location Updated!", "", "success");
    } catch (err) {
      Swal.fire("Error", "An error occurred while saving changes.", "error");
    }
  }
};
