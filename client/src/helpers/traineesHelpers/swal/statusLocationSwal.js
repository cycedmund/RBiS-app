import Swal from "sweetalert2";
import {
  locationOptions,
  statusOptions,
} from "../../../utilities/swal/options";
import { swalSettings } from "../../../utilities/swal/swalSettings";

export const statusSwal = async (trainee, isCourseIC) => {
  return await Swal.fire({
    ...swalSettings("Edit Status", "question"),
    showCancelButton: true,
    input: "select",
    inputOptions: statusOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Status is required!";
      }
      if (value === trainee.status[0].status && !isCourseIC) {
        return "Please choose a different status.";
        //Only Course IC can choose similar status, due to applyAll
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].status;
      document.querySelectorAll(".swal2-select option").forEach((option) => {
        if (option.value === trainee.status[0].status && !isCourseIC) {
          option.disabled = true;
        }
      });
    },
  });
};

export const locationSwal = async (trainee, isCourseIC) => {
  return Swal.fire({
    ...swalSettings("Edit Location", "question"),
    input: "select",
    showCancelButton: true,
    inputOptions: locationOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Location is required!";
      }
      if (value === trainee.status[0].location && !isCourseIC) {
        return "Please choose a different location.";
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].location;
      document.querySelectorAll(".swal2-select option").forEach((option) => {
        if (option.value === trainee.status[0].location && !isCourseIC) {
          option.disabled = true;
        }
      });
    },
  });
};
