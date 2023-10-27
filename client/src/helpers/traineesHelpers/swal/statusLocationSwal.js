import Swal from "sweetalert2";
import {
  locationOptions,
  statusOptions,
} from "../../../utilities/swal/options";
import { swalSettings } from "../../../utilities/swal/swalSettings";

export const statusSwal = async (trainee) => {
  return await Swal.fire({
    ...swalSettings("Edit Status", "question"),
    showCancelButton: true,
    input: "select",
    inputOptions: statusOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Status is required!";
      }
      if (value === trainee.status[0].status) {
        return "Please choose a different status.";
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].status;
      document.querySelectorAll(".swal2-select option").forEach((option) => {
        if (option.value === trainee.status[0].status) {
          option.disabled = true;
        }
      });
    },
  });
};

export const locationSwal = async (trainee) => {
  return Swal.fire({
    ...swalSettings("Edit Location", "question"),
    input: "select",
    showCancelButton: true,
    inputOptions: locationOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Location is required!";
      }
      if (value === trainee.status[0].location) {
        return "Please choose a different location.";
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].location;
      document.querySelectorAll(".swal2-select option").forEach((option) => {
        if (option.value === trainee.status[0].location) {
          option.disabled = true;
        }
      });
    },
  });
};
