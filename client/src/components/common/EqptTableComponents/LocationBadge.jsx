import { GiClick } from "react-icons/gi";

const LocationBadge = ({ unit, handleEditLocation }) => {
  return (
    <span className="relative">
      {unit.status === "In Store" ? (
        <span
          className="bg-[#0d9488] text-[#134e4a] text-sm font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-[#134e4a] dark:text-[#fb7185] cursor-pointer md:w-24 whitespace-nowrap"
          onClick={() => handleEditLocation(unit)}
        >
          {unit.status}
        </span>
      ) : (
        <span
          className="bg-[#fcd34d] text-[#881337] text-sm font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-[#881337] dark:text-[#fcd34d] cursor-pointer md:w-24 whitespace-nowrap"
          onClick={() => handleEditLocation(unit)}
        >
          {unit.status}
        </span>
      )}
      <span
        onClick={() => handleEditLocation(unit)}
        className="absolute bottom-0 right-0 -mb-3 -mr-1 cursor-pointer md:absolute"
      >
        <GiClick className="text-lg text-[#a8a29e]" />
      </span>
    </span>
  );
};
export default LocationBadge;
