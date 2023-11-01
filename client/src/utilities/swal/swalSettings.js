export const swalSettings = (title, icon) => {
  const settings = {
    title: title,
    icon: icon,
    background: "#32323a",
    color: "white",
    confirmButtonColor: "#6988e4",
    cancelButtonColor: "#2a2a36",
    confirmButtonText: "Okay",
    allowOutsideClick: false,
    width: 350,
    customClass: {
      title: "custom-title-swal",
      htmlContainer: "custom-font-swal",
      confirmButton: "custom-confirm-swal",
      cancelButton: "custom-cancel-swal",
      input: "custom-input-swal",
    },
  };
  return settings;
};
