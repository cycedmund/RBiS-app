export const getTotalCount = (equipment) => {
  return equipment?.counts?.reduce(
    (accumulator, categoryCounts) => {
      accumulator.count += categoryCounts.count;
      accumulator.inStoreCount += categoryCounts.inStoreCount;
      accumulator.outsideStoreCount += categoryCounts.outsideStoreCount;

      return accumulator;
    },
    {
      count: 0,
      inStoreCount: 0,
      outsideStoreCount: 0,
    }
  );
};
