export const swalBasicSettings = (title, icon) => {
  const settings = {
    title: title,
    icon: icon,
    background: "#202029",
    color: "white",
    confirmButtonColor: "#6988e4",
    cancelButtonColor: "#202029",
    customClass: {
      htmlContainer: "custom-font-swal",
      confirmButton: "custom-font-swal",
    },
  };
  return settings;
};
