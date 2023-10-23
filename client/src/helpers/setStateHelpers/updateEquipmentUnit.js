export const updateEquipmentUnit = (equipment, unit, updatedInfo) => {
  return equipment.equipment.map((item) => {
    if (item.units.some((unitItem) => unitItem._id === unit._id)) {
      return {
        ...item,
        units: item.units.map((unitItem) => {
          if (unitItem._id === unit._id) {
            return updatedInfo;
          }
          return unitItem;
        }),
      };
    }
    return item;
  });
};
