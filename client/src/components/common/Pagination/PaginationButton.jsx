const PaginationButton = ({
  traineesAbsent,
  traineesPerPage,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="join">
      {Array.from({
        length: Math.ceil(traineesAbsent.length / traineesPerPage),
      }).map((_, index) => (
        <button
          key={index}
          className={`join-item btn btn-xs ${
            currentPage === index + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationButton;
