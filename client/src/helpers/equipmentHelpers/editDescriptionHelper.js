import Swal from "sweetalert2";
import { editEquipmentDescService } from "../../utilities/equipment/equipment-service";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editDescriptionHelper = async (unit, equipment, setEquipment) => {
  const { value: newDescription } = await Swal.fire({
    title: "Edit Description",
    input: "textarea",
    inputValue: unit.description || "",
    showCancelButton: true,
    didClose: async () => {
      if (newDescription !== undefined) {
        try {
          const updatedDescription = await editEquipmentDescService(
            unit._id,
            newDescription
          );
          const updatedEquipment = updateEquipmentUnit(
            equipment,
            unit,
            updatedDescription.data.updatedDescription
          );
          setEquipment({ ...equipment, equipment: updatedEquipment });
          Swal.fire("Description Updated!", "", "success");
        } catch (error) {
          console.error("Error updating description:", error);
          Swal.fire(
            "Error",
            "An error occurred while saving changes.",
            "error"
          );
        }
      }
    },
  });
};
