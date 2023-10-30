import Swal from "sweetalert2";
import { swalSettings } from "./swalSettings";

export const errorSwal = (err) => {
  if (err.message === "Unexpected end of JSON input") {
    Swal.fire({
      ...swalSettings("Internal Server Error", "error"),
      text: "Please try again later.",
    });
  } else {
    Swal.fire({
      ...swalSettings("Error", "error"),
      text: err.response.data.message,
      confirmButtonText: "Try Again",
    });
  }
};
