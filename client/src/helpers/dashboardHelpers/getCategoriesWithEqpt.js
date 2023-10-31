export const getCategoriesWithEqpt = (categories, unitsWithCategory) => {
  return categories.map((category) => {
    const inStoreUnits = unitsWithCategory
      .filter(
        (unit) => unit.status === "In Store" && unit.category === category
      )
      .map((unit) => ({
        serialNumber: unit.serialNumber,
        equipment: unit.equipment,
      }));

    const outsideStoreUnits = unitsWithCategory
      .filter(
        (unit) => unit.status === "Outside Store" && unit.category === category
      )
      .map((unit) => ({
        serialNumber: unit.serialNumber,
        equipment: unit.equipment,
      }));

    return {
      category,
      inStoreUnits,
      outsideStoreUnits,
    };
  });
};
