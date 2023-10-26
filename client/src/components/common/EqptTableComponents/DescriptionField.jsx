// import { FiEdit2 } from "react-icons/fi";

const DescriptionField = ({ unit, handleEditDescription }) => {
  return (
    <div className="relative">
      {unit.description !== "" ? (
        <div
          className="cursor-text"
          onClick={() => handleEditDescription(unit)}
        >
          <div className="max-w-[200px] max-h-[80px] overflow-auto p-2 bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
            {unit.description.split("\n").map((line, index) => (
              <div key={index} className="whitespace-pre-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p
          className="max-w-[200px] bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400 cursor-text"
          onClick={() => handleEditDescription(unit)}
        >
          No Description
        </p>
      )}
      {/* <span className="absolute bottom-0 right-8 -mb-1 cursor-pointer md:absolute">
        <FiEdit2 className="text-lg text-white fill-white" />
      </span> */}
    </div>
  );
};

export default DescriptionField;
