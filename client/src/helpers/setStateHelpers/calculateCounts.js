export const calculateCounts = (equipmentData) => {
  const counts = {};

  equipmentData.forEach((category) => {
    const categoryName = category.category;

    if (!counts[categoryName]) {
      counts[categoryName] = {
        category: categoryName,
        count: 0,
        inStoreCount: 0,
        outsideStoreCount: 0,
      };
    }

    category.units.forEach((unit) => {
      counts[categoryName].count++;

      switch (unit.status) {
        case "In Store":
          counts[categoryName].inStoreCount++;
          break;
        case "Outside Store":
          counts[categoryName].outsideStoreCount++;
          break;
        default:
          break;
      }
    });
  });

  return Object.values(counts);
};
