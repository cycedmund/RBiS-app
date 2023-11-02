import Swal from "sweetalert2";
import { editEquipmentDescService } from "../../utilities/equipment/equipment-service";
import { errorSwal } from "../../utilities/swal/errorSwal";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editDescriptionHelper = async (unit, equipment, setEquipment) => {
  const { value: newDescription } = await Swal.fire({
    ...swalSettings("Edit Description", "info"),
    input: "textarea",
    allowOutsideClick: false,
    inputValue: unit.description || "",
    inputValidator: (value) => {
      if (value === unit.description) {
        return "Please input a new description";
      }
    },
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

          Swal.fire(swalSettings("Updated!", "success"));
        } catch (err) {
          errorSwal(err);
        }
      }
    },
  });
};
