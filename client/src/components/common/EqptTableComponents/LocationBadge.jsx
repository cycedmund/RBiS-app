import { GiClick } from "react-icons/gi";

const LocationBadge = ({ unit, handleEditLocation }) => {
  return (
    <span className="relative">
      {unit.status === "In Store" ? (
        <span
          className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 cursor-pointer md:w-24 whitespace-nowrap"
          onClick={() => handleEditLocation(unit)}
        >
          {unit.status}
        </span>
      ) : (
        <span
          className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 cursor-pointer md:w-24 whitespace-nowrap"
          onClick={() => handleEditLocation(unit)}
        >
          {unit.status}
        </span>
      )}
      <span
        onClick={() => handleEditLocation(unit)}
        className="absolute bottom-0 right-0 -mb-3 -mr-1 cursor-pointer md:absolute"
      >
        <GiClick className="text-lg" />
      </span>
    </span>
  );
};
export default LocationBadge;
