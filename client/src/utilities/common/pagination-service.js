export const showTraineesPerPage = (currentPage, trainees, traineesPerPage) => {
  const startIndex = (currentPage - 1) * traineesPerPage;
  const endIndex = startIndex + traineesPerPage;
  return trainees.slice(startIndex, endIndex);
};
