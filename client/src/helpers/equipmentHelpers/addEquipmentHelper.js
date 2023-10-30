import { format } from "date-fns";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import Swal from "sweetalert2";
import { sortEquipmentInState } from "../../utilities/common/sort-state-service";
import { addEquipmentService } from "../../utilities/equipment/equipment-service";
import { errorSwal } from "../../utilities/swal/errorSwal";
import {
  PSTAROptions,
  RBS70Options,
  signalOptions,
} from "../../utilities/swal/options";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { addEquipmentSchema } from "../../utilities/yup/yup-schema";
import { calculateCounts } from "../setStateHelpers/calculateCounts";

export const addEquipmentHelper = async (setEquipment) => {
  // const path = window.location.pathname.split("/");
  // const category = path[path.length - 1];
  // const decodedCategory = decodeURIComponent(category).replace(/%20/g, " ");
  // console.log(decodedCategory);
  function addOptions(options) {
    const equipmentDropdown = document.getElementById("equipment");
    options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.value = option;
      optionEl.text = option;

      equipmentDropdown.appendChild(optionEl);
    });
  }
  const result = await Swal.fire({
    ...swalSettings("Add Equipment", "question"),
    showCancelButton: true,
    showLoaderOnConfirm: true,
    html: `
    <div class="category-container">
      <label for="category" >Category</label>
      <select class="swal2-select" id="category">
      <option value="RBS 70">RBS 70</option>
      <option value="PSTAR">PSTAR</option>
      <option value="Signal">Signal</option>
      </select>
    </div>
    <div class="equipment-container">
      <label for="equipment" >Equipment</label>
      <select class="swal2-select" id="equipment">
      </select>
    </div>
    <div class="serialNumber-container">
      <label for="serialNumber">Serial Number</label>
      <input type="text" class="swal2-input" id="serialNumber">
    </div>
    <div class="datepicker-container">
      <label for="loanStartDate">Loan Start Date</label>
      <input type="text" class="swal2-input" id="loanStartDate">
    </div>
    <div class="datepicker-container">
      <label for="loanEndDate">Loan End Date</label>
      <input type="text" class="swal2-input" id="loanEndDate">
    </div>
    <div class="datepicker-container">
      <label for="lastServicingDate">Last Servicing Date</label>
      <input type="text" class="swal2-input" id="lastServicingDate">
    </div>
    <div class="frequency-container">
      <label for="frequency" >Servicing Frequency</label>
      <select class="swal2-select" id="frequency">
        <option value="1">Monthly</option>
        <option value="3">3-Monthly</option>
        <option value="6">6-Monthly</option>
        <option value="12">Yearly</option>
      </select>
    </div>
  `,
    focusConfirm: false,
    preConfirm: () => {
      const category = Swal.getPopup().querySelector("#category").value;
      const equipment = Swal.getPopup().querySelector("#equipment").value;
      const serialNumber = Swal.getPopup().querySelector("#serialNumber").value;
      const loanStartDate =
        Swal.getPopup().querySelector("#loanStartDate").value;
      const loanEndDate = Swal.getPopup().querySelector("#loanEndDate").value;
      const lastServicingDate =
        Swal.getPopup().querySelector("#lastServicingDate").value;
      const servicingFrequency =
        Swal.getPopup().querySelector("#frequency").value;

      try {
        const equipmentData = {
          category,
          equipment,
          serialNumber,
          loanStartDate,
          loanEndDate,
          lastServicingDate,
          servicingFrequency,
        };
        addEquipmentSchema.validateSync(equipmentData, {
          abortEarly: false,
        });
        return equipmentData;
      } catch (err) {
        Swal.showValidationMessage(err.errors.join("<br>"));
        return false;
      }
    },
    didOpen: () => {
      const categoryDropdown = document.getElementById("category");
      categoryDropdown.value = "";
      categoryDropdown.addEventListener("change", () => {
        const selectedCategory = categoryDropdown.value;
        const equipmentDropdown = document.getElementById("equipment");
        equipmentDropdown.innerHTML = "";

        switch (selectedCategory) {
          case "RBS 70":
            addOptions(RBS70Options);
            break;
          case "PSTAR":
            addOptions(PSTAROptions);
            break;
          case "Signal":
            addOptions(signalOptions);
            break;
        }
      });
      const startDateInput = new Pikaday({
        field: document.getElementById("loanStartDate"),
        yearRange: 20,
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanStartDate").value = formattedDate;
        },
      });
      startDateInput.setDate(new Date());

      const endDateInput = new Pikaday({
        field: document.getElementById("loanEndDate"),
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanEndDate").value = formattedDate;
        },
      });
      const initEndDate = new Date();
      initEndDate.setMonth(initEndDate.getMonth() + 6);
      endDateInput.setDate(initEndDate);

      const lastServicingDateInput = new Pikaday({
        field: document.getElementById("lastServicingDate"),
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("lastServicingDate").value = formattedDate;
        },
      });
      lastServicingDateInput.setDate(new Date());
    },
  });
  if (result.isConfirmed) {
    try {
      console.log("new", result.value);
      const newEquipment = await addEquipmentService(result.value);
      console.log(newEquipment);

      const totalEquipmentCount = newEquipment.data.totalEquipmentCount;

      setEquipment((prevEquipment) => {
        const updatedIndex = prevEquipment.equipment.findIndex(
          (item) => item._id === newEquipment.data.updatedEquipment._id
        );

        if (updatedIndex !== -1) {
          const updatedEquipmentList = [...prevEquipment.equipment];
          updatedEquipmentList[updatedIndex] =
            newEquipment.data.updatedEquipment;
          const updatedCounts = calculateCounts(updatedEquipmentList);
          return {
            ...prevEquipment,
            equipment: updatedEquipmentList,
            totalEquipmentCount: totalEquipmentCount,
            counts: updatedCounts,
          };
        }
        const updatedEquipmentList = [...prevEquipment.equipment];
        updatedEquipmentList.push(newEquipment.data.updatedEquipment);
        sortEquipmentInState(updatedEquipmentList);
        const updatedCategories = [...prevEquipment.categories];
        updatedCategories.push(newEquipment.data.updatedEquipment.category);
        const updatedCounts = calculateCounts(updatedEquipmentList);
        return {
          ...prevEquipment,
          categories: updatedCategories,
          equipment: updatedEquipmentList,
          totalEquipmentCount: totalEquipmentCount,
          counts: updatedCounts,
        };
      });

      Swal.fire({
        ...swalSettings("Equipment Added", "success"),
        text: `${result.value.equipment} ${result.value.serialNumber} has been added`,
      });
    } catch (err) {
      errorSwal(err);
    }
  }
};

// ${
//   decodedCategory === "RBS 70"
//     ? '<option value="RBS 70">RBS 70</option>'
//     : ""
// }
// ${
//   decodedCategory === "PSTAR"
//     ? '<option value="PSTAR">PSTAR</option>'
//     : ""
// }
// ${
//   decodedCategory === "Signal"
//     ? '<option value="Signal">Signal</option>'
//     : ""
// }
