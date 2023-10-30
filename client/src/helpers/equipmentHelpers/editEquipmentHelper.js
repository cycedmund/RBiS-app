import Swal from "sweetalert2";
import Pikaday from "pikaday";
import { updateEquipmentService } from "../../utilities/equipment/equipment-service";
import { updateEquipmentUnit } from "../setStateHelpers/updateEquipmentUnit";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { format } from "date-fns";
import { editEquipmentSchema } from "../../utilities/yup/yup-schema";
import { errorSwal } from "../../utilities/swal/errorSwal";

export const editEquipmentHelper = async (unit, equipment, setEquipment) => {
  let startDateInput, endDateInput;

  const result = await Swal.fire({
    ...swalSettings("Edit Equipment", "question"),
    showCancelButton: true,
    width: "450px",
    html: `
      <div class="serialNumber-container flex items-center justify-center">
        <label for="serialNumber" class="w-12">S/No</label>
        <input id="serialNumber" class="swal2-input bg-[#e9e9ea] text-[#202029] " placeholder="Serial Number" value="${unit.serialNumber}">
      </div>
      <div class="datepicker-container flex items-center justify-center">
        <label for="loanStartDate" class="w-12">Loan Start</label>
        <input id="loanStartDate" class="swal2-input bg-[#e9e9ea] text-[#202029]" />
      </div>
      <div class="datepicker-container flex items-center justify-center">
        <label for="loanEndDate" class="w-12">Loan End</label>
        <input id="loanEndDate" class="swal2-input bg-[#e9e9ea] text-[#202029]" />
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const serialNumber = Swal.getPopup().querySelector("#serialNumber").value;
      const loanStartDate =
        Swal.getPopup().querySelector("#loanStartDate").value;
      const loanEndDate = Swal.getPopup().querySelector("#loanEndDate").value;
      if (
        serialNumber === unit.serialNumber &&
        new Date(loanStartDate).getTime() ===
          new Date(unit.loanStartDate).getTime() &&
        new Date(loanEndDate).getTime() === new Date(unit.loanEndDate).getTime()
      ) {
        Swal.showValidationMessage("Please make your edits.");
        return false;
      }

      //getTime to compare

      try {
        const equipmentData = { serialNumber, loanStartDate, loanEndDate };
        editEquipmentSchema.validateSync(equipmentData, { abortEarly: false });
        return equipmentData;
      } catch (err) {
        Swal.showValidationMessage(err.errors.join("<br>"));
        return false;
      }
    },
    didOpen: () => {
      startDateInput = new Pikaday({
        field: document.getElementById("loanStartDate"),
        format: "dd-MMM-yyyy",
        yearRange: 20,
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanStartDate").value = formattedDate;
        },
      });
      startDateInput.setDate(new Date(unit.loanStartDate));

      endDateInput = new Pikaday({
        field: document.getElementById("loanEndDate"),
        format: "dd-MMM-yyyy",
        yearRange: 20,
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanEndDate").value = formattedDate;
        },
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
      Swal.fire(swalSettings("Equipment updated", "success"));
    } catch (err) {
      errorSwal(err);
    }
  }
};
