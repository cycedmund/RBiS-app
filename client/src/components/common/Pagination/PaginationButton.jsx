const PaginationButton = ({
  items,
  itemsPerPage,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="join flex items-center justify-center mt-2 overflow-x-auto whitespace-nowrap">
      {Array.from({
        length: Math.ceil(items.length / itemsPerPage),
      }).map((_, index) => (
        <button
          key={index}
          className={`join-item btn btn-xs border-[#65656c] bg-[#202029]  ${
            currentPage === index + 1
              ? "text-[#e9e9ea]"
              : "text-[#65656c] bg-[#2a2a36]"
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
