import Swal from "sweetalert2";
import { swalSettings } from "../../../utilities/swal/swalSettings";

export const applyAllSwal = async () => {
  return await Swal.fire({
    ...swalSettings("Apply to all trainees", "question"),
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
};
