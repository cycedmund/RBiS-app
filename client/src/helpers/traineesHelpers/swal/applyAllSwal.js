import Swal from "sweetalert2";

export const applyAllSwal = async () => {
  return await Swal.fire({
    title: "Apply to all trainees?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
};
