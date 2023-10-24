import Swal from "sweetalert2";
import {
  locationOptions,
  statusOptions,
} from "../../../utilities/swal/options";

export const statusSwal = async (trainee) => {
  return await Swal.fire({
    title: "Edit Status",
    showCancelButton: true,
    input: "select",
    inputOptions: statusOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Status is required!";
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].status;
    },
  });
};

export const locationSwal = async (trainee) => {
  return Swal.fire({
    title: "Edit Location",
    input: "select",
    showCancelButton: true,
    inputOptions: locationOptions,
    inputValidator: (value) => {
      if (!value) {
        return "Location is required!";
      }
    },
    didOpen: () => {
      Swal.getInput().value = trainee.status[0].location;
    },
  });
};
