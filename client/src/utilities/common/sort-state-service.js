export const sortEquipmentInState = (equipment) => {
  const sortEquipment = equipment.sort((a, b) =>
    a.equipment.localeCompare(b.equipment)
  );

  sortEquipment.forEach((equipment) => {
    equipment.units.sort((a, b) =>
      a.serialNumber.localeCompare(b.serialNumber, "en", { numeric: true })
    );
  });
  return sortEquipment;
};
