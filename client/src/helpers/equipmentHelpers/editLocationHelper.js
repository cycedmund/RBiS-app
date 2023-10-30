import Swal from "sweetalert2";
import { editEquipmentLocationService } from "../../utilities/equipment/equipment-service";
import { errorSwal } from "../../utilities/swal/errorSwal";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { calculateCounts } from "../setStateHelpers/calculateCounts";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editLocationHelper = async (unit, equipment, setEquipment) => {
  const newLocation = unit.status === "In Store" ? "Outside Store" : "In Store";

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
      Swal.fire({
        ...swalSettings("Location updated", "success"),
        allowOutsideClick: false,
        text: `${
          newLocation === "Outside Store"
            ? `Took ${unit.serialNumber} out of store`
            : `${unit.serialNumber} returned to store`
        }`,
      });
    } catch (err) {
      errorSwal(err);
    }
  }
};

// const { value: newLocation } = await Swal.fire({
//   ...swalSettings("Edit Location", "question"),
//   input: "select",
//   inputOptions: {
//     "In Store": "In Store",
//     "Outside Store": "Outside Store",
//   },
//   inputPlaceholder: "Select a new location",
//   inputValue: "Select a new location",
//   showCancelButton: true,
//   confirmButtonText: "Save",
//   allowOutsideClick: false,
//   inputValidator: (value) => {
//     if (!value) {
//       return "You need to select a location!";
//     }
//     if (value === unit.status) {
//       return "Please select a new location!";
//     }
//   },
//   didOpen: () => {
//     Swal.getInput().focus();
//     document.querySelectorAll(".swal2-select option").forEach((option) => {
//       if (option.value === unit.status) {
//         option.disabled = true;
//       }
//     });
//   },
// });
