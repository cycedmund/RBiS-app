import Swal from "sweetalert2";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import { updateEquipmentService } from "../../utilities/equipment/equipment-service";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";

export const editEquipmentHelper = async (unit, equipment, setEquipment) => {
  let startDateInput, endDateInput;

  const result = await Swal.fire({
    title: "Edit Equipment",
    html: `
      <input id="serialNumber" class="swal2-input" placeholder="Serial Number" value="${unit.serialNumber}">
      <div class="datepicker-container flex items-center justify-center">
        <label for="loanStartDate" class="w-12">Start</label>
        <input id="loanStartDate" class="swal2-input" />
      </div>
      <div class="datepicker-container flex items-center justify-center">
        <label for="loanEndDate" class="w-12">End</label>
        <input id="loanEndDate" class="swal2-input" />
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const serialNumber = Swal.getPopup().querySelector("#serialNumber").value;
      const loanStartDate =
        Swal.getPopup().querySelector("#loanStartDate").value;
      const loanEndDate = Swal.getPopup().querySelector("#loanEndDate").value;
      return { serialNumber, loanStartDate, loanEndDate };
    },
    didOpen: () => {
      startDateInput = new Pikaday({
        field: document.getElementById("loanStartDate"),
        format: "YYYY-MM-DD",
      });
      setTimeout(() => startDateInput.show(), 400);
      startDateInput.setDate(new Date(unit.loanStartDate));

      endDateInput = new Pikaday({
        field: document.getElementById("loanEndDate"),
        format: "YYYY-MM-DD",
      });
      endDateInput.setDate(new Date(unit.loanEndDate));
    },
    willClose: () => {
      startDateInput.destroy();
      endDateInput.destroy();
    },
  });

  if (result.isConfirmed) {
    try {
      const newEquipmentUnit = await updateEquipmentService(
        unit._id,
        result.value
      );
      const updatedEquipment = updateEquipmentUnit(
        equipment,
        unit,
        newEquipmentUnit.data.updatedEquipmentUnit
      );
      setEquipment({ ...equipment, equipment: updatedEquipment });
      Swal.fire("Changes Saved!", "", "success");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while saving changes.", "error");
    }
  }
};
