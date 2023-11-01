const TraineeDeleteButton = ({ handleDeleteTrainee, trainee }) => {
  return (
    <button
      className="inline-flex items-center px-2 md:px-3 py-1 bg-[#c87575] transition ease-in-out delay-75 hover:bg-red-500 text-slate-300 text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 mr-4"
      onClick={() =>
        handleDeleteTrainee(trainee._id, trainee.formattedFullName)
      }
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className="sm:h-5 sm:w-5 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </button>
  );
};

export default TraineeDeleteButton;
