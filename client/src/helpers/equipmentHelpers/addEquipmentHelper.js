import { format } from "date-fns";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
import Swal from "sweetalert2";
import { addEquipmentService } from "../../utilities/equipment/equipment-service";
import { errorSwal } from "../../utilities/swal/errorSwal";
import { swalSettings } from "../../utilities/swal/swalSettings";
import { addEquipmentSchema } from "../../utilities/yup/yup-schema";
import { calculateCounts } from "../setStateHelpers/calculateCounts";

export const addEquipmentHelper = async (setEquipment) => {
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
            addOptions([
              "Sight",
              "Stand",
              "Missile",
              "RWD",
              "IFF",
              "RWD Battery",
              "WIA Cables",
            ]);
            break;
          case "PSTAR":
            addOptions([
              "Antenna",
              "R/T",
              "IFF",
              "Pedestal Assembly",
              "Cable Reel",
              "Generator",
            ]);
            break;
          case "Signal":
            addOptions([
              "RT",
              "Amplifier",
              "Headset",
              "AB 288",
              "Short Whip",
              "Long whip",
              "Gooseneck",
              "Battery",
              "Battery Cover",
              "Harness",
              "Accessory Bag",
              "Speakers",
              "CX1289",
              "CX1286",
              "Telejay",
              "D10 Reel",
              "D-Sized Batteries",
            ]);
            break;
        }
      });
      const startDateInput = new Pikaday({
        field: document.getElementById("loanStartDate"),
        format: "dd-MMM-yyyy",
        yearRange: 20,
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanStartDate").value = formattedDate;
        },
      });
      startDateInput.setDate(new Date());

      const endDateInput = new Pikaday({
        field: document.getElementById("loanEndDate"),
        format: "dd-MMM-yyyy",
        onSelect: function (date) {
          const formattedDate = format(date, "dd-MMM-yyyy");
          document.getElementById("loanEndDate").value = formattedDate;
        },
      });
      endDateInput.setDate(new Date());

      const lastServicingDateInput = new Pikaday({
        field: document.getElementById("lastServicingDate"),
        format: "dd-MMM-yyyy",
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
      const newEquipment = await addEquipmentService(result.value);

      console.log("new", newEquipment);

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

        return prevEquipment;
      });

      Swal.fire("Success", "Equipment added successfully", "success");
    } catch (err) {
      errorSwal(err);
      // if (err.inner) {
      //   const yupErrors = err.inner.map((err) => err.message);
      //   console.log(yupErrors);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Validation Error",
      //     html: yupErrors.join("<br/>"),
      //   });
      // } else {
      //   console.error(err);
      //   Swal.fire(
      //     "Error",
      //     "An error occurred while adding equipment.",
      //     "error"
      //   );
      // }
    }
  }
};
