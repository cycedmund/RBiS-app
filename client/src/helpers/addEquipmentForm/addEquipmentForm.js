export const addEquipmentForm = (decodedCategory) => {
  return `
  <div class="category-container">
    <label for="category" >Category</label>
    <select class="swal2-select" id="category">
      ${
        !decodedCategory || decodedCategory === "equipment"
          ? `
            <option value="RBS 70">RBS 70</option>
            <option value="PSTAR">PSTAR</option>
            <option value="Signal">Signal</option>
          `
          : ""
      }
      ${
        decodedCategory === "RBS 70"
          ? '<option value="RBS 70" selected>RBS 70</option>'
          : ""
      }
      ${
        decodedCategory === "PSTAR"
          ? '<option value="PSTAR" selected>PSTAR</option>'
          : ""
      }
      ${
        decodedCategory === "Signal"
          ? '<option value="Signal" selected>Signal</option>'
          : ""
      }
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
`;
};
