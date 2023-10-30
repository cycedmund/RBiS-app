const sortEquipment = (equipmentData) => {
  equipmentData.forEach((equipment) => {
    equipment.units.sort((a, b) =>
      a.serialNumber.localeCompare(b.serialNumber, "en", { numeric: true })
    );
  });
  return equipmentData;
};

const sortEquipmentUnit = (equipmentData) => {
  equipmentData.units.sort((a, b) =>
    a.serialNumber.localeCompare(b.serialNumber, "en", { numeric: true })
  );

  return equipmentData;
};

module.exports = { sortEquipment, sortEquipmentUnit };
